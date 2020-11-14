import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { Account } from "../../db/enities/accounts/Account";
import {
  AccountResponse,
  AccountsResponse,
  DeleteAccountResponse,
  ErrorInfo,
} from "../responses";
import { MyContext } from "../../types/types";
import { __prod__ } from "../../constants";
import {
  Transaction,
  TransactionType,
} from "../../db/enities/transactions/Transaction";

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

@InputType()
class UpdateAccountInput {
  @Field({
    nullable: false,
    description: "The id of the account to update. (required)",
  })
  id!: number;

  @Field({ nullable: true, description: "The new name for the account." })
  name?: string;

  @Field({
    nullable: true,
    description: "The new description for the account.",
  })
  description?: string;

  @Field({ nullable: true, description: "The new balance for the account." })
  balance?: number;
}
@InputType()
class DeleteAccountInput {
  @Field({
    nullable: false,
    description: "The id of the account to delete. (required)",
  })
  id!: number;
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
        error: __prod__ ? error.toString() : "unkown error occurred",
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

    data = await em.find<Account>(Account, {
      owner: req.session!.userId,
      active: true, // active should be true, otherwise the account is 'deleted'
    });

    return {
      errors,
      ok,
      data,
    };
  }
  // U: update account mutation
  @Mutation(() => AccountResponse)
  @Authorized()
  async updateAccount(
    @Ctx() { req, em }: MyContext,
    @Arg("options", () => UpdateAccountInput) options: UpdateAccountInput
  ): Promise<AccountResponse> {
    // Setup the return variables
    const errors: ErrorInfo[] = [];
    let ok = true;
    let data: Account | null = null;

    // Check if the id is given, if not: return with error
    if (!options.id) {
      errors.push({
        error: "id is required",
        field: "id",
        message: "The id is needed for this request!",
      });
      return {
        errors,
        ok: false,
        data,
      };
    }

    // Check if the current user matches the owner of the account.
    try {
      const account = await em.findOneOrFail(Account, {
        id: options.id,
        owner: req.session!.userId,
      });

      // Check if name is provided
      if (options.name) {
        // Validate name
        if (options.name.length < 3) {
          errors.push({
            field: "name",
            message: "The account name should be atleast 3 characters long.",
            error: "name to short, name not updating",
          });
        } else {
          // Set the accounts name
          account.name = options.name;
        }
      }
      if (options.description) {
        account.description = options.description;
      }
      if (options.balance) {
        account.balance = options.balance;
      }

      em.persistAndFlush(account);
      data = account;
    } catch (e) {
      errors.push({
        field: "id",
        message: "The account was not found",
        error: __prod__ ? "account was not found (404)" : e.toString(),
      });
      console.error("Error, when updating account (prob: 404), see:", e);
      ok = false;
    }

    return {
      errors,
      ok,
      data,
    };
  }
  // D: delete account mutation
  @Mutation(() => DeleteAccountResponse)
  @Authorized()
  async deleteAccount(
    @Ctx() { req, em }: MyContext,
    @Arg("options", () => DeleteAccountInput) options: DeleteAccountInput
  ): Promise<DeleteAccountResponse> {
    // Setup the return variables
    const errors: ErrorInfo[] = [];
    let ok = true;
    let success = false;

    if (!options.id) {
      errors.push({
        field: "id",
        message: "The id field is required!",
        error: "id is required",
      });
      return {
        ok: false,
        data: success,
        errors,
      };
    }

    try {
      const account = await em.findOneOrFail(Account, {
        id: options.id,
        owner: req.session!.userId,
      });
      account.active = false; // Accounts are not actually deleted (for now) --> active is set to false
      em.persistAndFlush(account);
      success = true;
    } catch (error) {
      // Handle error
      errors.push({
        field: "id",
        message: "The account was not found",
        error: __prod__ ? "account was not found (404)" : error.toString(),
      });
      console.error("Error, when updating account (prob: 404), see:", error);
      ok = false;
    }

    return {
      errors,
      ok,
      data: success,
    };
  }

  // Field resolvers
  // transactions
  @FieldResolver(() => [Transaction], {
    nullable: true,
    description: "Retrieve all the transactions, both expenses and income",
  })
  async transactions(@Root() account: Account): Promise<Transaction[] | null> {
    // TODO: Implement pagination
    let transactions: Transaction[] | null = null;
    if (!account.transactions?.isInitialized()) {
      const transactionsCollection = await account.transactions?.init();
      transactions = await transactionsCollection!.loadItems();
    } else {
      const transactionsCollection = account.transactions;
      transactions = await transactionsCollection!.loadItems();
    }
    return transactions;
  }

  @FieldResolver(() => [Transaction], {
    nullable: true,
    description: "Retrieve all the income.",
  })
  async income(@Root() account: Account): Promise<Transaction[] | null> {
    // TODO: Implement pagination
    let income: Transaction[] | null = null;
    if (!account.transactions?.isInitialized()) {
      const transactionsCollection = await account.transactions?.init({
        where: { type: TransactionType.INCOME },
      });
      income = await transactionsCollection!.loadItems();
    } else {
      const transactionsCollection = account.transactions;
      const allTransactions = await transactionsCollection!.loadItems();
      income = allTransactions.filter((t) => t.type === TransactionType.INCOME);
    }
    return income;
  }

  @FieldResolver(() => [Transaction], {
    nullable: true,
    description: "Retrieve all the income.",
  })
  async expense(@Root() account: Account): Promise<Transaction[] | null> {
    // TODO: Implement pagination
    let expense: Transaction[] | null = null;
    if (!account.transactions?.isInitialized()) {
      const transactionsCollection = await account.transactions?.init({
        where: { type: TransactionType.EXPENSE },
      });
      expense = await transactionsCollection!.loadItems();
    } else {
      const transactionsCollection = account.transactions;
      const allTransactions = await transactionsCollection!.loadItems();
      expense = allTransactions.filter(
        (t) => t.type === TransactionType.EXPENSE
      );
    }
    return expense;
  }
  // balance --> calculate the balance based on the transactions linked to the account.
}
