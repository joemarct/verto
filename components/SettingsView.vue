<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="p-t-xl">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/main">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~/assets/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <p class="p-t-lg has-text-aqua is-size-4">
        Settings
      </p>
      <div class="p-t-xl">
        <div class="is-size-5 has-text-white is-pulled-left">
          <font-awesome-icon icon="sync-alt" class="fa-xs"/>
        </div>
        <span class="p-l-md has-text-white is-size-5">
          Check for Updates
        </span>
      </div>
    </div>
    <div class="hero-foot">
      <div class="has-text-grey-light is-size-7 p-b-md p-t-md p-l-md">
        Version 0.1.0
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSyncAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSyncAlt, faArrowLeft);

Vue.component("font-awesome-icon", FontAwesomeIcon);
// import Ledger from "@/ledger-mock.js";
// let ledger = new Ledger();

// export default {
//   props: {
//     amount: {
//       type: Number,
//       default: 0
//     }
//   },
//   data() {
//     let data = {
//       currency: "",
//       from: "",
//       to: {
//         account: "",
//         wallet: ""
//       },
//       id: "",
//       block: "",
//       date: ""
//     };
//     return data;
//   },
//   mounted() {
//     this.retrieveTransactions();
//   },
//   methods: {
//     async retrieveTransactions() {
//       const userTransactions = await ledger.retrieveTransactions({
//         account: "EOS6Ew693sd741xNhBPGaa72cujaaMByyJ7UBpWR5c9QnCsVcRuP4",
//         key: "EOS5vBqi8YSzFCeTv4weRTwBzVkGCY5PN5Hm1Gp3133m8g9MtHTbW"
//       });
//       //this.amount = userTransactions.transactions[0].amount.toFixed(2);
//       this.from = userTransactions.transactions[0].from;
//       this.to = userTransactions.transactions[0].to;
//       this.id = userTransactions.transactions[0].id;
//       this.date = userTransactions.transactions[0].submittedAt;
//       this.currency = userTransactions.transactions[0].currency;
//     },
//     test() {
//       console.log(location);
//     }
//   }
// };
</script>

<style>
.is-size-custom-header {
  font-size: 1.7rem;
}
.logo {
  height: 3.3rem;
  border-top: solid 0.2rem rgba(55, 202, 189, 0.3);
}
.is-size-vtx-amount {
  font-size: 2.7rem;
}
.copy-button {
  width: 100%;
}
.has-blur-background {
  background-image: url(~/assets/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.has-text-aqua {
  color: #2cfee6;
}
.size-smaller {
  font-size: 0.75rem;
}
.is-vcentered {
  align-items: center;
}
.line-height-md {
  line-height: 1rem;
}
.list-item {
  border-bottom: solid 1px rgba(55, 202, 189, 0.3);
  width: 100vw;
}
.hero-foot {
  border-top: solid 1px rgba(55, 202, 189, 0.3);
}
</style>
