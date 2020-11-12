import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";

import { BaseEntity } from "../BaseEnitity";
import { Transaction } from "../transactions/Transaction";
import { User } from "../User";

@Entity()
export class Tag extends BaseEntity {
  @Property()
  name!: string;

  @Property({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => User)
  owner!: User;

  @ManyToMany({ entity: () => Tag, owner: true, nullable: true })
  transactions? = new Collection<Transaction>(this);
  // @ManyToOne(() => Transaction)
  // transactions!: Transaction;
}
