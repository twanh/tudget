import { Migration } from '@mikro-orm/migrations';

export class Migration20201112170805 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tag_transactions" ("tag_1_id" int4 not null, "tag_2_id" int4 not null);');
    this.addSql('alter table "tag_transactions" add constraint "tag_transactions_pkey" primary key ("tag_1_id", "tag_2_id");');

    this.addSql('alter table "category" drop constraint "category_transactions_id_foreign";');
    this.addSql('alter table "category" drop column "transactions_id";');

    this.addSql('alter table "tag_transactions" add constraint "tag_transactions_tag_1_id_foreign" foreign key ("tag_1_id") references "tag" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "tag_transactions" add constraint "tag_transactions_tag_2_id_foreign" foreign key ("tag_2_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
