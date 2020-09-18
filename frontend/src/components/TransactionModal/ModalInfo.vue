<template>
  <div class="block">
    <ul>
      <li class="info-icon-align" v-if="transaction.amount">
        <b-tooltip
          label="The amount of the transaction"
          animated
          position="is-right"
        >
          <span class="panel-block has-text-white">
            <span class="panel-icon">
              <b-icon
                icon="cash"
                :type="
                  transaction.type === 'expense' ? 'is-danger' : 'is-success'
                "
              />
            </span>
            <span class="info-block-data"
              ><span
                class="has-text-weight-medium"
                :class="
                  transaction.type === 'expense'
                    ? 'has-text-danger'
                    : 'has-text-success'
                "
                >Amount: </span
              ><span v-if="transaction.type === 'expense'">-</span>&euro;{{
                transaction.amount
              }}</span
            >
          </span>
        </b-tooltip>
      </li>
      <li class="info-icon-align" v-if="transaction.description">
        <b-tooltip
          label="The description of the transaction"
          animated
          position="is-right"
        >
          <span class="panel-block has-text-white">
            <span class="panel-icon">
              <b-icon icon="information" type="is-secondary" />
            </span>
            <span class="info-block-data"
              ><span class="has-text-secondary has-text-weight-medium"
                >Description: </span
              >{{ transaction.description }}</span
            >
          </span>
        </b-tooltip>
      </li>

      <li class="info-icon-align" v-if="accountName">
        <b-tooltip
          animated
          position="is-right"
          label="The account associated with this transaction"
        >
          <span class="panel-block has-text-white">
            <span class="panel-icon">
              <b-icon icon="account" type="is-info" />
            </span>
            <span class="info-block-data"
              ><span class="has-text-info has-text-weight-medium"
                >Account:</span
              >
              {{ accountName }}</span
            >
          </span>
        </b-tooltip>
      </li>
      <li class="info-icon-align" v-if="transaction.category">
        <b-tooltip
          animated
          position="is-right"
          label="The category associated with this transaction"
        >
          <span class="panel-block has-text-white">
            <span class="panel-icon">
              <b-icon icon="alpha-c-box" type="is-success" />
            </span>
            <span class="info-block-data"
              ><span class="has-text-success has-text-weight-medium"
                >Category:</span
              >
              {{ transaction.category }}</span
            >
          </span>
        </b-tooltip>
      </li>
      <li class="info-icon-align" v-if="transaction.spendOn">
        <b-tooltip
          animated
          position="is-right"
          label="The date of when this transaction occured"
        >
          <span class="panel-block has-text-white">
            <span class="panel-icon">
              <b-icon icon="calendar" type="is-secondary" />
            </span>
            <span class="info-block-data"
              ><span class="has-text-secondary has-text-weight-medium"
                >Spend on:</span
              >
              {{ transaction.spendOn }}</span
            >
          </span>
        </b-tooltip>
      </li>

      <li
        class="info-icon-align"
        v-if="transaction.tags && transaction.tags.length > 0"
      >
        <b-tooltip
          animated
          position="is-right"
          label="The tags associated with this transaction"
        >
          <span class="panel-block has-text-white">
            <span class="panel-icon">
              <b-icon icon="tag-multiple" type="is-info" />
            </span>
            <span class="has-text-info has-text-weight-medium">Tags:</span>
            <b-taglist style="margin-left: 5px;">
              <b-tag
                type="is-info"
                v-for="(tag, indx) in transaction.tags"
                :key="indx"
                >{{ tag }}</b-tag
              >
            </b-taglist>
          </span>
        </b-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ModalInfo",
  props: ["transaction", "accountName"],
  // computed: {
  //   transaction() {
  //     return this.$store.getters["transactions/getTransaction"](
  //       this.transactionPk,
  //       this.transactionType
  //     );
  //   },
  // },
};
</script>

<style lang="scss">
.info-block-data {
  padding-left: 2px;
  margin-top: 8px;
}
</style>
