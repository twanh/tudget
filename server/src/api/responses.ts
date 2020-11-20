import { Transaction } from "../db/enities/transactions/Transaction";
import { Field, ObjectType } from "type-graphql";

import { Account } from "../db/enities/accounts/Account";
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

// *Single* account response
@ObjectType()
export class AccountResponse extends DefaultResponse {
  @Field(() => Account, { nullable: true })
  data?: Account | null;
}

// *Multiple* accounts response
@ObjectType()
export class AccountsResponse extends DefaultResponse {
  @Field(() => [Account], { nullable: true })
  data?: Account[] | null;
}

// *Delete* account response
// returns boolean indicating if the account was correctly deleted
@ObjectType()
export class DeleteAccountResponse extends DefaultResponse {
  @Field(() => Boolean)
  data: boolean;
}

// *Single* transaction response
@ObjectType()
export class TransactionResponse extends DefaultResponse {
  @Field(() => Transaction, { nullable: true })
  data?: Transaction | null;
}

// *Multiple* transaction response
@ObjectType()
export class TransactionsResponse extends DefaultResponse {
  @Field(() => [Transaction], { nullable: true })
  data?: Transaction[] | null;
}
