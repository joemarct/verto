<template>
  <section class="hero is-fullheight is-light is-bold" >
    <div class="hero-head top-bg">
      <div class="container dark-blue-gradient">
        <div class="container p-l-lg p-r-lg p-b-md">
          <div class="p-t-lg p-b-lg has-text-centered">
            <!-- <div class="is-pulled-left is-vcentered is-flex m-t-md">
              <router-link to="/welcome">
                <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
              </router-link>
            </div> -->
            <img src="~@/assets/img/wallet-logo.png" class="logo">
            <div class="is-pulled-right is-vcentered is-flex m-t-md">
              <router-link to="/settings">
                <font-awesome-icon icon="sliders-h" class="is-size-5 has-text-white" flip="horizontal"/>
              </router-link>
            </div>
          </div>
          <div class="p-b-md level is-mobile">
            <div class="level-left has-text-centered">
              <div>
                <div class="level is-mobile is-size-5 font-gibson">
                  <p class="level-left has-text-primary" >{{ $t('TransactionHistory.history') }}</p>
                  <div class="level-right is-size-5 has-text-white m-l-md">
                    <font-awesome-icon icon="sync-alt" style="cursor:pointer" @click="refreshContent"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="level-right has-text-centered">
              <a @click="isCardModalActive = true">
                <qrcode :value="wallet" :options="{ size: 80 }" class="has-text-centered"></qrcode>
              </a>
            </div>
          </div>
        </div>
        <div class="has-text-white container p-b-md" >
          <div class="columns is-marginless is-mobile has-background-darkgreen p-l-lg p-r-lg p-t-sm p-b-sm has-text-centered">
            <b-tooltip :label="wallet" position="is-bottom" class="m-l-lg" type="is-white" style="width:80%">
              <div class="column is-11 is-paddingless wallet-address is-size-7 font-calibri">
                {{ $t('Main.address') }}:
                <span id="wallet-address">{{ wallet }}</span>
              </div>
            </b-tooltip>
            <div class="column is-1 is-paddingless has-text-right line-height-md">
              <a v-clipboard:copy="wallet" id="button-copy-wallet-address" @click="toast">
                <font-awesome-icon icon="copy" class="is-size-7 has-text-white"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-body is-paddingless has-background-darkgreen">
      <div class="container w-main-b-graident">
        <div class="columns is-marginless p-b-md">
          <div v-if="loadingData" class="p-l-lg p-r-md m-t-md is-size-4 has-text-grey-light">
            <p>
              {{ $t('Main.loading') }}...
            </p>
          </div>
          <div v-if="hasTransactions">
            <div v-for="transaction in transactions" :key="transaction.id" class="transaction_list column is-paddingless list-item">
              <a @click="transactionDetails(transaction)">
                <div class="columns is-marginless is-mobile p-t-md p-b-md p-r-md p-l-md">
                  <div class="column is-6 is-paddingless is-size-7 font-calibri">
                    <div class="columns is-marginless">
                      <div class="column is-paddingless">
                        <div class="level is-mobile has-text-white">
                          <div class="level-left">
                            {{ transaction.native_transaction_time | formatDate }}
                            <div class="level-left has-text-centered">
                            <font-awesome-icon v-if="transaction.status === 'CONFIRMED'" icon="ship" class="fa-sm has-text-white m-l-sm"/>
                          </div>
                          </div>
                          <div class="level-right">
                            {{ transaction.native_transaction_time | formatTime }}
                          </div>
                        </div>
                      </div>
                      <div class="column is-paddingless">
                        <div class="level is-mobile has-text-white">
                          <div class="level-left has-text-centered">
                            <font-awesome-icon v-if="transaction.status === 'CONFIRMED'" icon="ship" class="fa-sm has-text-white m-l-sm"/>
                          </div>
                          <div class="level-right">
                            {{ transaction.vtx_amount }} VTX
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div v-if="noTransactions">
            <p class="has-text-grey is-size-5 m-l-lg has-text-weight-bold">
              {{ $t('Main.transactions') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <a class="button is-fullwidth is-size-5 is-primary" @click="openZixipay"> -->
    <div class="hero-foot">
      <div class="container has-background-darklightgreen p-md has-text-white">
        {{ appName }}: {{ appVersion }}
      </div>
    </div>
    <b-modal :active.sync="isCardModalActive" class="modal-qr">
      <div class="card-content has-text-centered">
        <p class="image qr-modal">
          <qrcode :value="wallet" :options="{ size: 220 }" class="has-text-centered"></qrcode>
        </p>
      </div>
    </b-modal>
    <b-modal :active.sync="isTransactionDetailsActive" class="transaction-details-popup">
      <div class="card-content has-text-centered has-text-white">
        <p class="is-marginless is-size-4 has-text-white font-gibson"> {{ currentTransaction.status }} </p>
        <br>
        <table style="width:100%;">
          <tr>
            <td>
              {{ $t('TransactionHistory.native') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.native_currency.toUpperCase() }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.amount') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.native_amount }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.ratio') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.conversion_rate }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.confirmation') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.confirmations_count }}
            </td>
          </tr>
          <tr v-if="currentTransaction.ledger_transaction_id">
            <td>
              {{ $t('TransactionHistory.transid') }}
            </td>
            <td class="td-align-right ledger-id-wrap">
              {{ currentTransaction.ledger_transaction_id }}
            </td>
          </tr>
        </table>
        <p class="is-marginless is-size-5 has-text-white font-gibson"> VTX </p>
        <br>
        <table style="width:100%;">
          <tr>
            <td>
              {{ $t('TransactionHistory.pre') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.pre_bonus_vtx_amount }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.phase') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.phase_bonus_vtx_amount }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.additional') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.additional_bonus_vtx_amount }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.total') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.vtx_amount }}
            </td>
          </tr>
        </table>
        <p class="is-marginless is-size-5 has-text-white font-gibson">Steps </p>
        <br>
        <table style="width:100%;">
          <tr>
            <td>
              {{ $t('TransactionHistory.received') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.native_transaction_time | formatDate}} {{ currentTransaction.native_transaction_time | formatTime}}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.converted') }}:
            </td>
            <td class="td-align-right"  v-if="currentTransaction.conversion_time">
              {{ currentTransaction.conversion_time | formatDate}} {{ currentTransaction.conversion_time | formatTime}}
            </td>
            <td class="td-align-right"  v-if="!currentTransaction.conversion_time">
              {{ $t('TransactionHistory.pending') }}...
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.confirmed') }}:
            </td>
            <td class="td-align-right" v-if="currentTransaction.confirmation_time">
              {{ currentTransaction.confirmation_time | formatDate}} {{ currentTransaction.confirmation_time | formatTime}}
            </td>
            <td class="td-align-right" v-if="!currentTransaction.confirmation_time">
              {{ $t('TransactionHistory.pending') }}...
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.approved') }}:
            </td>
            <td class="td-align-right"  v-if="currentTransaction.approved_time">
              {{ currentTransaction.approved_time | formatDate}} {{ currentTransaction.approved_time | formatTime}}
            </td>
            <td class="td-align-right"  v-if="!currentTransaction.approved_time">
              {{ $t('TransactionHistory.pending') }}...
            </td>
          </tr>
        </table>
      </div>
    </b-modal>
  </section>
</template>

<script>
import Ledger from "volentix-ledger";
import axios from 'axios'

const chainId = process.env.CHAIN_ID
const httpEndpoint = process.env.HTTP_ENDPOINT

const myaccount = "vtxtrust";
let ledger = {};

export default {
  data() {
    return {
      transactions: [],
      messages: "",
      isCardModalActive: false,
      wallet: "",
      hasTransactions: false,
      noTransactions: false,
      appVersion: this.$appVersion,
      appName: this.$appName,
      loadingData: true,
      currentBtcValue: 0.0,
      isTransactionDetailsActive: false,
      transactionStatus: "CONFIRMED",
      currentTransaction: {
        'native_currency': ""
      }
    };
  },
  mounted() {
    this.setWallet();
    this.getPendingTransactions();
  },
  methods: {
    setWallet: function() {
      this.wallet = this.$store.state.userKey;
    },
    async getPendingTransactions() {
      let results = await axios.get(process.env.CROWDFUND_URL + "/public/api/investor-transactions?verto_public_address=" + this.wallet + "&status_code=" + this.transactionStatus);
      console.log(results.data)
      this.loadingData = false;
      if (results.data.length > 0) {
        this.transactions = results.data;
        this.hasTransactions = true;
        this.noTransactions = false;
      } else {
        this.transactions = [];
        this.hasTransactions = false;
        this.noTransactions = true;
      }
    },
    transactionDetails(transaction) {
      this.currentTransaction = transaction;
      this.isTransactionDetailsActive = true;
    },
    removeToast: function() {
      this.isCopied = false;
    },
    copiedClicked: function() {
      this.isCopied = true;
      setTimeout(this.removeToast, 2000);
    },
    toast() {
      this.$toast.open({
        type: "is-white",
        message: this.$t('Main.copied'),
        duration: 2000
      });
    },
    refreshContent() {
      this.getPendingTransactions();
    }
  }
};
</script>

<style scoped>
.td-align-right {
  text-align: right;
  display:block
}
.ledger-id-wrap {
  max-width: 10rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.notices.is-top {
  top: 18rem !important;
  left: 18.5rem;
}
.notices .toast {
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
}
.is-vcentered {
  align-items: center;
}
.top-bg {
  background-image: url(~@/assets/img/wallet-main-top-bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.dark-blue-gradient {
  background: linear-gradient(
    to bottom,
    rgba(41, 137, 216, 0) 0%,
    rgba(255, 255, 255, 0) 10%,
    rgba(34, 52, 53, 1) 100%
  );
}
.w-main-b-graident {
  background: linear-gradient(
    to bottom,
    rgba(34, 52, 53, 1) 0%,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.1) 80%,
    rgba(255, 255, 255, 0) 90%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
.wallet-address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
}
.line-height-md {
  line-height: 1rem;
}
.logo {
  height: 3.5rem;
}
.list-item {
  border-bottom: solid 1px rgba(55, 202, 189, 0.3);
  width: 100vw;
}
.hero-body {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  align-items: flex-start !important;
}
.hero-body > .container {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.hero-foot {
  border-top: none;
}
.hero.is-fullheight .hero-body {
  flex: 1;
}
.hero.is-fullheight {
  height: 100vh;
}
</style>
