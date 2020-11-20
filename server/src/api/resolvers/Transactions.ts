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
import { Category } from "../../db/enities/groupings/Category";
import { Tag } from "../../db/enities/groupings/Tag";
import { MyContext } from "../../types/types";
import { __prod__ } from "../../constants";

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

@InputType()
class TransactionInput {
  @Field(() => Number)
  id!: number;
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
  @Authorized()
  async transactions(
    @Ctx() { req, em }: MyContext,
    @Arg("options", () => TransactionsInput, { nullable: true })
    options: TransactionsInput
  ): Promise<TransactionsResponse> {
    const errors: ErrorInfo[] = [];
    let ok = true;
    let data: Transaction[] = [];

    if (!options) {
      data = await em.find(Transaction, {
        owner: req.session!.userId,
      });
    } else {
      const dbOptions = {
        ...(options.accountId && { account: options.accountId }),
        ...(options.categoryId && { category: options.categoryId }),
        ...(options.type && { type: options.type }),
      };
      data = await em.find(Transaction, {
        owner: req.session!.userId,
        ...dbOptions,
      });
    }
    // Return
    return {
      errors,
      ok,
      data,
    };
  }

  @Query(() => TransactionResponse)
  @Authorized()
  async transaction(
    @Ctx() { req, em }: MyContext,
    @Arg("options", () => TransactionInput) options: TransactionInput
  ): Promise<TransactionResponse> {
    const errors: ErrorInfo[] = [];
    let ok = true;
    let data: Transaction | null = null;

    data = await em.findOne(Transaction, {
      id: options.id,
      owner: req.session!.userId,
    });

    if (!data) {
      ok = false;
      errors.push({
        field: "id",
        message: `Transaction with id ${options.id} not found.`,
        error: "not found",
      });
    }

    return {
      errors,
      ok,
      data,
    };
  }

  // U: Update a transaction
  // D: Delete a transaction

  // Field resolvers
  // category
  // tag
  // account
}
