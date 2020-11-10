import { Entity, ManyToOne, Property } from "@mikro-orm/core";

import { BaseEntity } from "../BaseEnitity";
import { User } from "../User";

@Entity()
export class Tag extends BaseEntity {
  @Property()
  name!: string;

  @Property({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => User)
  owner!: User;
}
