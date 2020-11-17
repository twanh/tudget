import { Migration } from '@mikro-orm/migrations';

export class Migration20201117203828 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "email" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "account" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text null, "owner_id" int4 not null, "active" bool not null, "inital_balance" int4 not null);');

    this.addSql('create table "tag" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text null, "owner_id" int4 not null);');

    this.addSql('create table "tag_transactions" ("tag_1_id" int4 not null, "tag_2_id" int4 not null);');
    this.addSql('alter table "tag_transactions" add constraint "tag_transactions_pkey" primary key ("tag_1_id", "tag_2_id");');

    this.addSql('create table "category" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text null, "owner_id" int4 not null);');

    this.addSql('create table "transaction" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text null, "amount" int4 not null, "owner_id" int4 not null, "account_id" int4 not null, "type" int2 not null, "spend_on" timestamptz(0) not null, "category_id" int4 null);');

    this.addSql('create table "transaction_tags" ("transaction_id" int4 not null, "tag_id" int4 not null);');
    this.addSql('alter table "transaction_tags" add constraint "transaction_tags_pkey" primary key ("transaction_id", "tag_id");');

    this.addSql('alter table "account" add constraint "account_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "tag" add constraint "tag_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "tag_transactions" add constraint "tag_transactions_tag_1_id_foreign" foreign key ("tag_1_id") references "tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "tag_transactions" add constraint "tag_transactions_tag_2_id_foreign" foreign key ("tag_2_id") references "tag" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "category" add constraint "category_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "transaction" add constraint "transaction_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "transaction" add constraint "transaction_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade;');
    this.addSql('alter table "transaction" add constraint "transaction_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete set null;');

    this.addSql('alter table "transaction_tags" add constraint "transaction_tags_transaction_id_foreign" foreign key ("transaction_id") references "transaction" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "transaction_tags" add constraint "transaction_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
