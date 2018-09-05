<template>
  <section class="hero is-fullheight is-light is-bold" >
    <div class="hero-head top-bg">
      <Div class="container dark-blue-gradient">
        <div class="container p-l-lg p-r-lg p-b-md">
          <div class="p-t-lg p-b-lg has-text-centered">
            <img src="~/assets/img/wallet-logo.png" class="logo">
            <div class="is-pulled-right is-vcentered is-flex m-t-md">
              <font-awesome-icon icon="sliders-h" class="is-size-5 has-text-white" flip="horizontal" @click="goToNext" />
            </div>
          </div>
          <div class="p-b-md level is-mobile">
            <div class="level-left has-text-centered">
              <div>
                <p class="is-marginless is-size-1 has-text-white font-gibson">11.21 VTX</p>
                <div class="level is-mobile is-size-5 font-gibson">
                  <div class="level-left has-text-primary" >0.0323 BTC</div>
                  <div class="level-right">
                    <font-awesome-icon icon="sync-alt" class="is-size-5 has-text-white" @click="refreshClicked" />
                  </div>
                </div>
              </div>
            </div>
            <div class="level-right has-text-centered">
              <img src="~/assets/img/qr-code.png" class="Logo">
            </div>
          </div>
        </div>
        <div class="has-text-white container p-b-md" >
          <span v-if="active" class="hover-wallet-address p-l-sm p-r-sm has-background-primary">
            {{ wallet }}
          </span>
          <div class="columns is-marginless is-mobile has-background-darkgreen p-l-lg p-r-lg p-t-sm p-b-sm" >
            <div class="column is-11 is-paddingless wallet-address is-size-7 font-calibri" @mouseover="active = !active" @mouseout="active = !active">
              Wallet address: {{ wallet }}
            </div>
            <div class="column is-1 is-paddingless has-text-right line-height-md">
              <a v-clipboard:copy="wallet">
                <font-awesome-icon icon="copy" class="is-size-7 has-text-white"/>
              </a>
            </div>
          </div>
        </div>
      </Div>
    </div>
    <div class="hero-body is-paddingless has-background-darkgreen">
      <div class="gradient-wrapper w-main-b-graident">&nbsp;</div>
      <div class="container">
        <div class="columns is-marginless p-b-md">
          <div class="p-l-md p-r-md m-t-lg p-b-none is-size-4 has-text-grey-light">
            Transaction History
          </div>
          <div v-for="transaction in transactions" :key="transaction.id" class="transaction_list column is-paddingless list-item has-background-darkgreen">
            <div class="columns is-marginless is-mobile p-t-md p-b-md p-r-md p-l-md">
              <span v-if="transactionOn" class="hover-wallet-address p-l-sm p-r-sm has-background-primary">
                {{ transaction.id }}
              </span>
              <div class="column is-6 is-paddingless is-size-7 font-calibri">
                <div class="columns is-marginless">
                  <div class="column is-paddingless">
                    <div class="level is-mobile has-text-white" @mouseover="transactionOn = !transactionOn" @mouseout="transactionOn = !transactionOn">
                      <div class="level-left">
                        {{ transaction.submittedAt | formatDate }}
                      </div>
                      <div class="level-right">
                        {{ transaction.submittedAt | formatTime }}
                      </div>
                    </div>
                  </div>
                  <div class="column is-paddingless">
                    <div class="wallet-address has-text-grey-light" >
                      NO: {{ transaction.wallet }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-1 is-paddingless">&nbsp;</div>
              <div class="column is-5 is-paddingless is-flex level level-right has-text-primary is-size-4">
                {{ transaction.sign ? '-' : '+' }} {{ transaction.amount }}{{ transaction.currency }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div class="container has-background-darklightgreen p-t-md p-b-md">
        &nbsp;
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSlidersH,
  faSyncAlt,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import moment from "moment";
import Ledger from "@/ledger-mock.js";

library.add(faSlidersH, faSyncAlt, faCopy);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MMM DD, YYYY");
  }
});

Vue.filter("formatTime", function(value) {
  if (value) {
    return moment(String(value)).format("h:mm A");
  }
});

const mywallet = "EOS5vBqi8YSzFCeTv4weRTwBzVkGCY5PN5Hm1Gp3133m8g9MtHTbW";
const myaccount = "vtxtrust";
const keyProvider = "EOS8TJpbWeQEoaMZMZzmo4SqC7DUucEUHRQJs1x7cXLcTqRhiJ7VF";
const chainId =
  "cf057bbfb72640471ff8a%90ba539c22df9f92470936cddc1ade0e2f2e7dc4f";
const httpEndpoint = "https://url-of-eos-node";

export default {
  data() {
    return {
      messages: "",
      wallet: "123dbdstsdfwe23234df9948sdfdse8b8dweb8sdfwe8df8we",
      active: false,
      transactionOn: false
    };
  },
  async asyncData(context) {
    console.log("context", context);
    const ledger = new Ledger({
      httpEndpoint: httpEndpoint,
      chainId: chainId,
      keyProvider: keyProvider
    });
    // Retrie Transactions
    const transactions = await ledger.retrieveTransactions({
      account: myaccount,
      wallet: mywallet
    });
    const transaction_list = [];
    transactions.transactions.forEach(tx => {
      let wallet;
      if (tx.from.wallet) wallet = tx.from.wallet;
      if (tx.to.wallet) wallet = tx.to.wallet;
      transaction_list.push({
        id: tx.id,
        to: tx.to.account,
        amount: Math.round(tx.amount * 100) / 100,
        submittedAt: tx.submittedAt,
        sign: myaccount === tx.from ? true : false,
        wallet: wallet,
        currency: tx.currency
      });
    });
    return { transactions: transaction_list };
  },
  methods: {
    goToNext: function() {
      window.alert("Navigate to setting");
    },
    refreshClicked: function() {
      window.alert("refresh clicked");
    },
    copiedClicked: function() {
      window.alert("copied clicked");
    }
  }
};
</script>

<style scoped>
.hover-wallet-address {
  position: absolute;
  margin-top: -1rem;
  font-size: 0.95rem;
}
.is-vcentered {
  align-items: center;
}
.top-bg {
  background-image: url(~/assets/img/wallet-main-top-bg.jpeg);
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
.gradient-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;
}
.hero.is-fullheight .hero-body {
  flex: 1;
}
.hero.is-fullheight {
  height: 100vh;
}
</style>
