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
                  <select class="input m-b-md" v-model="transactionFilter" @change="changeTransactionFilter">
                    <option value="CONVERTED">Pending</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
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
                Wallet address:
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
              Loading data...
            </p>
          </div>
          <div v-if="hasTransactions"> 
            <div v-if="doesMatchFilterTransaction(transaction)" v-for="transaction in transactions" :key="transaction.id" class="transaction_list column is-paddingless list-item">
              <div v-if="isConvertedTransaction(transaction)">
                <a @click="transactionDetails(transaction)">
                  <div class="p-l-md">
                    <div class="columns is-marginless">
                      <div  class="">
                        <div class="level has-text-white">
                          <div class="level-left">
                            <div class="block">
                              <p class="digit">{{ transaction.vtx_amount }} VTX</p>
                              <p class="text">&nbsp;</p>
                            </div>
                            <div class="block">
                              <p class="digit">&nbsp;</p>
                              <p class="text">&nbsp;</p>
                            </div>
                            <div class="block">
                              <p class="digit">&nbsp;</p>
                              <p class="text">&nbsp;</p>
                            </div>
                            <div class="block">
                              <p class="digit">{{ transaction.days | two_digits }}</p>
                              <p class="text">Days</p>
                            </div>
                            <div class="block">
                              <p class="digit">{{ transaction.hours | two_digits }}</p>
                              <p class="text">Hours</p>
                            </div>
                            <div class="block">
                              <p class="digit">{{ transaction.minutes | two_digits }}</p>
                              <p class="text">Minutes</p>
                            </div>
                            <div class="block">
                              <p class="digit">{{ transaction.seconds | two_digits }}</p>
                              <p class="text">Seconds</p>
                            </div>
                            <div v-if="!isManualInput(transaction)">
                              <div class="block">
                                <p class="digit">{{ transaction.confirmations_count }}/6</p>
                                <p class="text">Blocks Validated</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div v-if="!isConvertedTransaction(transaction)">
                <a @click="transactionDetails(transaction)">
                  <div class="p-l-md">
                    <div class="columns is-marginless">
                      <div  class="">
                        <div class="level has-text-white">
                          <div class="level-left">
                            <div class="block">
                              <p class="digit">{{ transaction.vtx_amount }} VTX</p>
                              <p class="text">&nbsp;</p>
                            </div>
                          </div>
                          <div v-if="transaction.status === 'CANCELLED'" class="level-left">
                            <div class="block">
                              <p class="digit">{{ transaction.native_transaction_time | formatDate}} {{ transaction.native_transaction_time | formatTime}}</p>
                              <p class="text">Canceled On</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div v-if="noTransactions">
            <p class="has-text-grey is-size-5 m-l-lg has-text-weight-bold">
              You have no transactions
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div class="has-background-darklightgreen">
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
    <b-modal :active.sync="isTransactionDetailsActive" class="modal-qr">
      <div class="card-content has-text-centered has-text-white">
        <p class="is-marginless is-size-4 has-text-white font-gibson"> {{ currentTransaction.status }} </p>
        <br>
        <table style="width:100%;">
          <tr>
            <td>
              Native Currency:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.native_currency.toUpperCase() }}
            </td>
          </tr>
          <tr>
            <td>
              Amount:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.native_amount }}
            </td>
          </tr>
          <tr>
            <td>
              Conversion Ratio:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.conversion_rate }}
            </td>
          </tr>
          <tr>
            <td>
              Confirmation:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.confirmations_count }}
            </td>
          </tr>
          <tr v-if="currentTransaction.ledger_transaction_id">
            <td>
              Ledger Trans. ID
            </td>
            <td class="td-align-right">
              {{ currentTransaction.ledger_transaction_id }}
            </td>
          </tr>
        </table>
        <p class="is-marginless is-size-5 has-text-white font-gibson"> VTX </p>
        <br>
        <table style="width:100%;">
          <tr>
            <td>
              Pre Bonus:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.pre_bonus_vtx_amount }}
            </td>
          </tr>
          <tr>
            <td>
              Phase Bonus:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.phase_bonus_vtx_amount }}
            </td>
          </tr>
          <tr>
            <td>
              Additional Bonus:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.additional_bonus_vtx_amount }}
            </td>
          </tr>
          <tr>
            <td>
              Total:
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
              Recieved:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.native_transaction_time | formatDate}} {{ currentTransaction.native_transaction_time | formatTime}}
            </td>
          </tr>
          <tr>
            <td>
              Converted:
            </td>
            <td class="td-align-right"  v-if="currentTransaction.conversion_time">
              {{ currentTransaction.conversion_time | formatDate}} {{ currentTransaction.conversion_time | formatTime}}
            </td>
            <td class="td-align-right"  v-if="!currentTransaction.conversion_time">
              Pending...
            </td>
          </tr>
          <tr>
            <td>
              Confirmed:
            </td>
            <td class="td-align-right" v-if="currentTransaction.confirmation_time">
              {{ currentTransaction.confirmation_time | formatDate}} {{ currentTransaction.confirmation_time | formatTime}}
            </td>
            <td class="td-align-right" v-if="!currentTransaction.confirmation_time">
              Pending...
            </td>
          </tr>
          <tr>
            <td>
              Approved:
            </td>
            <td class="td-align-right"  v-if="currentTransaction.approved_time">
              {{ currentTransaction.approved_time | formatDate}} {{ currentTransaction.approved_time | formatTime}}
            </td>
            <td class="td-align-right"  v-if="!currentTransaction.approved_time">
              Pending...
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
const crowdfundUrl = process.env.CROWDFUND_URL

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
      transactionFilter: 'CONVERTED',
      serverResults: [],
      now: Date.now(),
      currentTransaction: {
        'native_currency': ""
      },
      interval: null
    };
  },
  mounted() {
    this.setWallet();
    this.getPendingTransactions();
    this.startInterval();
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    changeTransactionFilter: function() {
      this.loadingData = false;
      if (this.serverResults.length <= 0) {
        this.transactions = [];
        this.hasTransactions = false;
        this.noTransactions = true;
        return;
      }
      this.transactions = [];
      this.transactions = this.serverResults;
      this.hasTransactions = true;
      this.noTransactions = false;
    },
    startInterval: function(transaction) {
      const self = this;
      this.interval = setInterval(() => {
        if (self.transactionFilter === "CONVERTED") {
          self.changeTransactionFilter();
        }
      }, 1000);
    },
    isConvertedTransaction: function(transaction) {
      if (transaction.status === 'CONVERTED') {
        const timeish = Math.trunc(Date.parse(transaction.countdown_time_ends) / 1000)
        const now = Math.trunc((new Date()).getTime() / 1000);
        transaction.days = Math.trunc((timeish - now) / 60 / 60 / 24);
        transaction.hours = Math.trunc((timeish - now) / 60 / 60) % 24;
        transaction.minutes = Math.trunc((timeish - now) / 60) % 60;
        transaction.seconds = (timeish - now) % 60;
      }
      return transaction.status === 'CONVERTED';
    },
    isManualInput: function(transaction) {
      return transaction.entry_path === 'manual';
    },
    doesMatchFilterTransaction: function(transaction) {
      return transaction.status === this.transactionFilter;
    },
    setWallet: function() {
      this.wallet = this.$store.state.userKey;
    },
    async getPendingTransactions() {
      const results = await axios.get(crowdfundUrl + "/public/api/investor-transactions?verto_public_address=" + this.wallet);
      this.serverResults = results.data
      console.log(JSON.stringify(this.serverResults));
      this.changeTransactionFilter();
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
        message: "Copied",
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
.block {
    display: flex;
    flex-direction: column;
    margin: 20px;
}
.text-white {
    color: #f4f4f4;
    font-size: 15px;
    font-family: 'Roboto Condensed', serif;
    font-weight: 400;
    margin-top:0px;
    margin-bottom: 0px;
    text-align: center;
}
.text {
    color: #1abc9c;
    font-size: 15px;
    font-family: 'Roboto Condensed', serif;
    font-weight: 400;
    margin-top:0px;
    margin-bottom: 0px;
    text-align: center;
}
.digit {
    color: #ecf0f1;
    font-size: 20px;
    font-weight: 100;
    font-family: 'Roboto', serif;
    margin: 0px;
    text-align: center;
}
.td-align-right {
  text-align: right; 
  display:block
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
  color: #f4f4f4;
}
.hero.is-fullheight .hero-body {
  flex: 1;
}
.hero.is-fullheight {
  height: 100vh;
}
</style>
