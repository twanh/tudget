import { Migration } from '@mikro-orm/migrations';

export class Migration20201110205059 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "account" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text null, "owner_id" int4 not null, "active" bool not null, "balance" int4 not null);');

    this.addSql('create table "tag" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text null, "owner_id" int4 not null);');

    this.addSql('create table "category" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text null, "owner_id" int4 not null);');

    this.addSql('create table "income" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text null, "amount" int4 not null, "account_id" int4 not null, "owner_id" int4 not null, "spend_on" timestamptz(0) not null, "category_id" int4 null);');

    this.addSql('create table "income_tags" ("income_id" int4 not null, "tag_id" int4 not null);');
    this.addSql('alter table "income_tags" add constraint "income_tags_pkey" primary key ("income_id", "tag_id");');

    this.addSql('create table "expense" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text null, "amount" int4 not null, "account_id" int4 not null, "owner_id" int4 not null, "spend_on" timestamptz(0) not null, "category_id" int4 not null);');

    this.addSql('create table "expense_tags" ("expense_id" int4 not null, "tag_id" int4 not null);');
    this.addSql('alter table "expense_tags" add constraint "expense_tags_pkey" primary key ("expense_id", "tag_id");');

    this.addSql('alter table "account" add constraint "account_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "tag" add constraint "tag_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "category" add constraint "category_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "income" add constraint "income_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade;');
    this.addSql('alter table "income" add constraint "income_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "income" add constraint "income_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete set null;');

    this.addSql('alter table "income_tags" add constraint "income_tags_income_id_foreign" foreign key ("income_id") references "income" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "income_tags" add constraint "income_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "expense" add constraint "expense_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade;');
    this.addSql('alter table "expense" add constraint "expense_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "expense" add constraint "expense_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;');

    this.addSql('alter table "expense_tags" add constraint "expense_tags_expense_id_foreign" foreign key ("expense_id") references "expense" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "expense_tags" add constraint "expense_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
