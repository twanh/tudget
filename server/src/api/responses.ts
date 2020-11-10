import { Field, ObjectType } from "type-graphql";

import { User } from "../db/enities/User";

@ObjectType()
export class ErrorInfo {
  // The field the error occured on
  @Field(() => String, { nullable: true })
  field!: string;

  // The (user friendly) message
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String)
  error: string;
}

@ObjectType()
export class DefaultResponse {
  @Field(() => [ErrorInfo])
  errors: ErrorInfo[];

  @Field(() => Boolean)
  ok: boolean;
}

@ObjectType()
export class UserResponse extends DefaultResponse {
  @Field(() => User, { nullable: true })
  data?: User | null;
}
