import {
  Transaction,
  TransactionType,
} from "../../db/enities/transactions/Transaction";
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
import {
  ErrorInfo,
  TransactionResponse,
  TransactionsResponse,
} from "../responses";
import { Account } from "../../db/enities/accounts/Account";
import { Category } from "src/db/enities/groupings/Category";
import { Tag } from "src/db/enities/groupings/Tag";
import { MyContext } from "src/types/types";
import { __prod__ } from "src/constants";

@InputType()
class CreateTransactionInput {
  @Field({ description: "The name of the transaction" })
  name!: string;

  @Field({ description: "The description of the transaction", nullable: true })
  description?: string;

  @Field({ description: "The amount that was spend with this transactions" })
  amount!: number;

  @Field(() => Number)
  accountId!: number;

  @Field(() => TransactionType, {
    description:
      "Defines wether a transactions is an expense or an income transaction",
  })
  type!: TransactionType;

  @Field(() => Date, {
    description: "The date the transaction was made on",
    nullable: true,
  })
  spendOn?: Date;

  @Field(() => Number, {
    description: "The id of the category this transaction fits in",
    nullable: true,
  })
  categoryId?: number;

  @Field(() => [Number], {
    description: "The id's of the tags this transaction has been assigned to", // TODO: Rephrase descriptions
    nullable: true,
  })
  tagsIds?: number[];
}

@InputType()
class TransactionsInput {
  @Field(() => Number, {
    description: "The ID of the account all the transactions should belong to",
    nullable: true,
  })
  accountId?: number;

  @Field(() => Number, {
    description: "The ID for the category the transactions should belong to.",
    nullable: true,
  })
  categoryId?: number;

  // TODO: Implement filtering by tag.
  // Probably have to go from the tag to the transactions, because otherwise we do
  // allTransactions --> currentTransactions.allTags --> tag in allTags
  // @Field(() => Number, {
  //   description: "The ID for the tag the transactions should belong to.",
  //   nullable: true,
  // })
  // tagId?: number;

  @Field(() => TransactionType, {
    description: "The type fo the transactions",
    nullable: true,
  })
  type?: TransactionType;
}

@Resolver(() => Transaction)
export class TransactionsResolver {
  // C: Create transaction
  @Mutation(() => TransactionResponse)
  @Authorized()
  async createTransaction(
    @Ctx() { req, em }: MyContext,
    @Arg("options", () => CreateTransactionInput)
    options: CreateTransactionInput
  ): Promise<TransactionResponse> {
    const errors: ErrorInfo[] = [];
    let ok = true;
    let data: Transaction | null = null;

    // Validate input (options)
    // - Check if the name is longer then 3 characters
    if (options.name.length < 3) {
      ok = false;
      errors.push({
        field: "name",
        message: "The name should alteast be 3 characters long",
        error: "name to short",
      });
    }
    // - Check if account belongs to the user
    const account = await em.findOne(Account, {
      owner: req.session!.userId,
      id: options.accountId,
    });
    if (!account) {
      ok = false;
      errors.push({
        field: "accountId",
        message: `The account with ${options.accountId} was not found`,
        error: "account not found - 404",
      });
    }
    // - Check if the tags belong to the user
    let userTags: Tag[] = [];
    if (options.tagsIds) {
      const allTags = await em.find(Tag, options.tagsIds);
      userTags = allTags.filter((tag) => tag.owner === req.session!.userId);
      if (userTags.length < 1) {
        ok = false;
        errors.push({
          field: "tags",
          message: "The tags specified could not be found",
          error: "tags not found - 404",
        });
      }
    }
    // - Check if the category belongs to the user
    let category: Category | null = null;
    if (options.categoryId) {
      category = await em.findOne(Category, {
        owner: req.session!.userId,
        id: options.categoryId,
      });
      if (!category) {
        ok = false;
        errors.push({
          field: "categoryId",
          message: "The category could not be found",
          error: "category not found - 404",
        });
      }
    }

    // Return if any errors occured when validating the data
    if (!ok) {
      return {
        errors,
        ok,
        data,
      };
    }

    // If there are no errors then create the new transactions
    const newTrans = em.create(Transaction, {
      name: options.name,
      account: options.accountId,
      owner: req.session!.userId,
      amount: options.amount,
      type: options.type,
    });

    if (options.description) {
      newTrans.description = options.description;
    }

    if (options.spendOn) {
      newTrans.spendOn = options.spendOn;
    }

    if (category) {
      newTrans.category = category;
    }
    try {
      await em.persistAndFlush(newTrans);
      data = newTrans;
    } catch (error) {
      console.error(error);
      errors.push({
        field: "unkown",
        message: "An unkown error occurred on the server.",
        error: __prod__ ? error.toString() : "internal server error",
      });
      return {
        data,
        errors,
        ok: false,
      };
    }

    return {
      data,
      errors,
      ok,
    };
  }
  // R: Get all transactions
  // TODO: Get by account, category or tags
  // Transactions, expenses and income query should all be able to do this
  @Query(() => TransactionsResponse)
  async transactions(
    @Ctx() { req, em }: MyContext,
    @Arg("options", () => TransactionsInput) options: TransactionsInput
  ): Promise<TransactionsResponse> {
    const errors: ErrorInfo[] = [];
    let ok = true;
    let data: Transaction[] = [];

    // NOTE: Perhaps use MikroOrm filters for entities?

    data = await em.find(Transaction, { owner: req.session!.userId });

    if (options.accountId) {
      // TODO: Make sure that the accounts are actually loaded.
      data = data.filter(
        (transaction) => transaction.account.id === options.accountId
      );
    }

    if (options.categoryId) {
      data = data.filter(
        (transaction) => transaction.category?.id === options.categoryId
      );
    }

    if (options.type) {
      data = data.filter((transaction) => transaction.type == options.type);
    }

    // Return
    return {
      errors,
      ok,
      data,
    };
  }
  // Get all expenses
  // @Query(() => TransactionsResponse)
  // async expenses(
  //   @Ctx() {req, em}: MyContext,
  // ): Promise<TransactionsResponse> {

  //   const errors: ErrorInfo[] = [];
  //   let ok = true;
  //   let data: Transaction[] = [];

  //   data = await em.find(Transaction, {owner: req.session!.userId, type: TransactionType.EXPENSE})

  //   // Return
  //   return {
  //     errors,
  //     ok,
  //     data
  //   }
  // }
  // // Get all the income
  // @Query(() => TransactionsResponse)
  // async income(
  //   @Ctx() {req, em}: MyContext,
  // ): Promise<TransactionsResponse> {

  //   const errors: ErrorInfo[] = [];
  //   let ok = true;
  //   let data: Transaction[] = [];

  //   data = await em.find(Transaction, {owner: req.session!.userId, type: TransactionType.INCOME})

  //   // Return
  //   return {
  //     errors,
  //     ok,
  //     data
  //   }
  // }

  // U: Update a transaction
  // D: Delete a transaction

  // Field resolvers
  // category
  // tag
  // account
}
