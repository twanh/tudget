import { EntityManager } from "@mikro-orm/postgresql";
import argon2 from "argon2";
import passwordStrength from "check-password-strength";
import { emailIsValid } from "../../util/validation/emailIsValid";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { __prod__ } from "../..//constants";
import { User } from "../../db/enities/User";
import { MyContext } from "../../types/types";
import { ErrorInfo } from "../responses";
import { UserResponse } from "../responses";

@InputType()
class RegisterInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

@InputType()
class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => UserResponse)
  async me(@Ctx() { em, req }: MyContext): Promise<UserResponse> {
    const errors: ErrorInfo[] = [];
    let data: User | null = null;
    const ok = true;

    if (!req.session!.userId) {
      errors.push({
        field: "qid",
        message: "You are not logged in",
        error: "coockie qid is not set",
      });
      return {
        ok: false,
        errors,
        data,
      };
    }

    // Find the  user
    const user = await em.findOne(User, { id: req.session!.userId });
    if (!user) {
      errors.push({
        field: "id",
        message: "User is not know",
        error: "id is not found",
      });
      return {
        ok: false,
        errors,
        data,
      };
    }

    data = user;
    return {
      data,
      errors,
      ok,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() { em, req }: MyContext,
    @Arg("options", () => LoginInput) options: LoginInput
  ): Promise<UserResponse> {
    const errors: ErrorInfo[] = [];
    let ok = true;
    let data: User | null = null;

    // Check if the user is currently logged in (should not be!)
    if (req.session!.userId) {
      ok = false;
      errors.push({
        field: "",
        error: "already loggedin",
        message: "You are already loggedin!",
      });
      return {
        ok,
        errors,
        data,
      };
    }

    // Check if the username is passedthrough
    if (!options.username) {
      ok = false;
      errors.push({
        field: "username",
        message: "Username is required.",
        error: "username required",
      });
    }

    // Check if the password is passedthrough

    if (!options.password) {
      ok = false;
      errors.push({
        field: "password",
        message: "Password is required",
        error: "password required",
      });
    }

    // If the username or password (or both) is not given
    // Return now with the error to save a db query
    if (!ok) {
      return {
        errors,
        ok,
        data,
      };
    }

    // Try to find the user with the given username
    const user = await em.findOne(User, { username: options.username });
    // If there is no user found, return
    if (!user) {
      ok = false;
      errors.push({
        field: "Username",
        message: "Username does not exist.",
        error: "username does not exist",
      });
      return {
        errors,
        data,
        ok,
      };
    }

    // Check if the password is valid, if not return with an error
    const validPassword = await argon2.verify(user.password, options.password);
    if (!validPassword) {
      ok = false;
      errors.push({
        field: "password",
        message: "Incorrect password.",
        error: "incorrect password",
      });
      return {
        ok,
        errors,
        data,
      };
    }

    // Set the userId coockie (sign the user in)
    req.session!.userId = user.id;

    data = user;

    // Return
    return {
      errors,
      ok,
      data,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Ctx() { em, req }: MyContext,
    @Arg("options", () => RegisterInput) options: RegisterInput
  ): Promise<UserResponse> {
    // Setup the return variables
    const errors: ErrorInfo[] = [];
    let ok = true;
    let data: User | null = null;

    // Validate input
    // Validate the username's length
    if (options.username.length < 4) {
      ok = false;
      errors.push({
        field: "username",
        message: "Username has to be atleast 4 characters long.",
        error: "username to short",
      });
    }

    // Validate the password lenght and strength
    if (options.password.length < 6) {
      ok = false;
      errors.push({
        field: "password",
        message: "Password has to be atleast 6 characters long",
        error: "password to short",
      });
    } else if (passwordStrength(options.password).id === 0) {
      ok = false;
      errors.push({
        field: "password",
        message: "Password is not strong enough.",
        error: "weak password",
      });
    }

    // Check if email adress is valid.
    if (!emailIsValid(options.email)) {
      ok = false;
      errors.push({
        field: "email",
        message: "Emailadress has to be a valid emailadress",
        error: "invalid email",
      });
    }

    // Check if there are no errors
    // If there are errors return now, so we do not create invalid users
    if (!ok) {
      return {
        ok,
        errors,
        data,
      };
    }

    // Hash password
    const hashedPassword = await argon2.hash(options.password);
    // Save to db
    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: options.username,
          password: hashedPassword,
          email: options.email,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
      data = result[0];
    } catch (error) {
      // If the error code is 23505 it means there is a duplicat field (unique_violation)
      // See: https://www.postgresql.org/docs/9.4/errcodes-appendix.html
      if (error.code === "23505") {
        // The contraint field on the error shows the field that is not valid
        if (error.constraint === "user_email_unique") {
          ok = false;
          errors.push({
            field: "email",
            message: "Emailadress is already in use!",
            error: __prod__ ? "duplicate email" : error.code,
          });
        } else if (error.constraint === "user_username_unique") {
          ok = false;
          errors.push({
            field: "username",
            message: "Username already taken",
            error: __prod__ ? "duplicate username" : error.code,
          });
        }
      } else {
        // If an error with an other code occured, it was unexpected
        errors.push({
          message: "Unkown error occurred in register mutation.",
          error,
          field: "unkown",
        });
      }
    }

    // Set the session coockie (logs the user in)
    if (ok && data) {
      console.log("setting coockie");
      req.session!.userId = data.id;
    }

    console.log({
      errors,
      ok,
      data,
    });
    // Return the response
    return {
      errors,
      ok,
      data,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session!.destroy((err) => {
        res.clearCookie(process.env.COOCKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
