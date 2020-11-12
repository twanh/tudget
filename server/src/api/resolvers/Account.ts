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

import { Account } from "../../db/enities/accounts/Account";
import { AccountResponse, AccountsResponse, ErrorInfo } from "../responses";
import { MyContext } from "../../types/types";
import { __prod__ } from "../../constants";

@InputType()
class CreateAccountInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  // Note: In the enitity this is the balance,
  // but this type is for creation and intialBalance makes the
  // purpose more clear
  @Field({ nullable: true })
  initalBalance?: number;
}

@Resolver(() => Account)
export class AccountResolver {
  // C: Create account mutation
  @Mutation(() => AccountResponse)
  @Authorized()
  async createAccount(
    @Ctx() { em, req }: MyContext,
    @Arg("options", () => CreateAccountInput) options: CreateAccountInput
  ): Promise<AccountResponse> {
    // Setup the return variables
    const errors: ErrorInfo[] = [];
    let ok = true;
    let data: Account | null = null;

    // Validate input

    // Check if name is given
    if (options.name.length < 3) {
      ok = false;
      errors.push({
        field: "name",
        message: "The account name should be atleast 3 characters long.",
        error: "name to short",
      });
    }

    // Return with the errors, if there are any validation errors
    if (!ok) {
      return {
        ok,
        errors,
        data,
      };
    }

    // Check if initial balance is set, if not set it to 0
    let balance = 0;
    if (options.initalBalance) {
      balance = options.initalBalance;
    }

    // Create in database
    data = em.create(Account, {
      name: options.name,
      description: options.description,
      owner: req.session!.userId,
      balance,
    });

    try {
      await em.persistAndFlush(data);
    } catch (error) {
      ok = false;
      errors.push({
        field: "unknown",
        message: "An unknown error occured",
        error: __prod__ ? error : "unkown error occurred",
      });
      console.error("Error when creating account:", error);
    }

    return {
      errors,
      ok,
      data,
    };
  }
  // R: Accounts query
  @Query(() => AccountsResponse)
  @Authorized()
  async accounts(@Ctx() { req, em }: MyContext): Promise<AccountsResponse> {
    // Setup the return variables
    const errors: ErrorInfo[] = [];
    const ok = true;
    let data: Account[] | null = null;

    data = await em.find<Account>(Account, { owner: req.session!.userId });

    return {
      errors,
      ok,
      data,
    };
  }
  // U: update account mutation
  // D: delete account mutation
  // Field resolvers
  // owner
  // balance --> calculate the balance based on the transactions linked to the account.
  // transactions --> return all the transactions
  // Perhaps? -- would need to add extra fields on the entitiy? (exclude from the database)
  // expenses
  // transactions
}
