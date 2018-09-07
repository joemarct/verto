<template>
  <div class="hero-body is-paddingless has-blur-background">
    <div class="gradient-wrapper">&nbsp;</div>
    <div class="container">
      <div class="columns is-marginless p-b-md">
        <div>
          <div class="top-layer">
            <div class="column list-item">
              <div class="is-size-custom-header has-text-centered">
                <p class="has-text-aqua">Transaction Record</p>
              </div>
              <router-link to="/main">
                <font-awesome-icon icon="arrow-left" class="is-size-6 has-text-white m-l-sm"/>
              </router-link>
              <div class="m-t-sm p-b-md is-size-vtx-amount has-text-centered">
                <p class="has-text-light">+ {{ $route.params.transaction.amount }} VTX</p>
              </div>
              <!-- <br> -->
              <font-awesome-icon icon="check-circle" class="is-size-3 has-text-aqua" style="position: absolute; margin-left: 10rem; margin-top: -0.2rem;"/>
            </div>
          </div>
        </div>
        <div class="column list-item">
          <p class="is-size-5 has-text-grey p-t-md p-l-sm">From:</p>
          <p class="size-smaller has-text-white p-l-sm"> {{ $route.params.transaction.wallet }} </p>
          <br>
          <p class="is-size-5 has-text-grey p-l-sm">To:</p>
          <p class="size-smaller has-text-white p-b-sm p-l-sm"> {{ $route.params.transaction.to }} </p>
        </div>
        <div class="column">
          <div class="level is-mobile">
            <div class="level-left">
              <div>
                <p class="is-size-5 has-text-grey p-t-sm p-l-sm">Transaction #:</p>
                <p class="size-smaller has-text-white p-l-sm"> {{ $route.params.transaction.id }} </p>
                <br>
                <p class="is-size-5 has-text-grey p-l-sm">Block #:</p>
                <p class="is-size-6 has-text-white p-l-sm">56952231</p>
                <br>
                <p class="is-size-5 has-text-grey p-l-sm">Transaction Time:</p>
                <div class="level is-mobile">
                  <div class="level-left">
                    <p class="is-size-6 has-text-white p-l-sm"> {{ $route.params.transaction.submittedAt | formatDate }} </p>
                  </div>
                  <div class="level-right">
                    <p class="is-size-6 has-text-white p-l-sm"> {{ $route.params.transaction.submittedAt | formatTime }} </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="level-right">
              <div>
                <p>
                  <qr :size="120" :margin="5" :text="$route.params.transaction.id" class="has-text-centered"/>
                </p>
                <p class="p-t-sm">
                  <a class="button copy-button is-small is-primary is-rounded"> Copy </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qr from "vue-qr";
export default {
  components: {
    qr
  }
};
</script>
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

<style>
.transaction-id {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.is-size-custom-header {
  font-size: 1.7rem;
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
</style>
