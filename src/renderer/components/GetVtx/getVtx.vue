<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm">
      <div class="p-l-lg m-t-md">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/main">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~@/assets/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <div class="p-md m-t-md">
        <p class="has-text-primary is-size-4">
          Buy VTX
        </p>
      </div>
      <div class="container has-background-darklightgreen has-text-white p-t-md p-b-md">
        <table style="width:100%">
          <tr>
            <td>
              VTX Sold: 
            </td>
            <td align="right">
              {{ summaryData.vtx_sold }} 
            </td>
          </tr>
          <tr>
            <td>
              Bonus Round: 
            </td>
            <td align="right">
              {{ summaryData.round }} 
            </td>
          </tr>
          <tr>
            <td>
              Bonus Amount: 
            </td>
            <td>
              {{ summaryData.bonus }}% 
            </td>
          </tr>
          <tr>
            <td>
              Price: 
            </td>
            <td>
              {{ summaryData.priceInBtc }} BTC
            </td>
          </tr>
          <tr v-if="this.summaryData.has_additional_bonus">
            <td>
              Additional Bonuses: 
            </td>
            <td>
              &nbsp;
            </td>
          </tr>
          <tr v-for="data in summaryData.additional_bonus" v-if="data.bonus != 0">
            <td>
              {{ data.symbol }} 
            </td>
            <td align="right">
              {{ data.bonus }} %
            </td>
          </tr>
        </table>
      </div>
      <div class="field">
        <div class="control p-md has-text-centered">
          <!-- <form method="POST" action="https://zixipay.com/sci/form"> -->
          <form method="POST">
            <input type="hidden" class="input m-b-md" name="merchant" placeholder="Merchant" value="M903342">
            <input type="hidden" class="input m-b-md" name="description" value="Testing payment">
            <input type="text" class="input m-b-md" name="amount" placeholder="Amount">
            <select class="input m-b-md" name="currency">
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
              <option value="EUR">Euro</option>
              <option value="USD">US Dollar</option>
            </select>
            <input type="text" class="input m-b-md" name="custom" value="this.$store.state.userKey">
            <input type="hidden" class="input m-b-md" name="hash">
            <a class="button m-t-md is-size-5 is-primary is-centered" @click="createHash">
              <p class="p-l-sm p-r-sm is-size-5">Get VTX</p>
            </a>
          </form>
        </div>
      </div>
      <!-- <iframe src="https://www.zixipay.com"/> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userKeys: "",
      messages: "",
      isCardModalActive: false,
      wallet: "",
      balance: 0,
      transactionLink: "/transactiondetails",
      hasTransactions: true,
      summaryData: {}
    };
  },
  methods: {
    async createHash() {
      let hashResult = await axios.post(
        "https://volentix-cf.tekstackapps.com/public/api/zixipay-create-hash/",
        {
          merchant: "M903342",
          // custom: this.$store.state.userKey,
          custom: "",
          amount: 123,
          currency: "USD"
        }
      );
      const res = await hashResult;
      // console.log("Value: ", res);
      this.userHash = res.data.hash;
      // console.log(this.userHash);
      // let userHash;
      // let a = hashResult.then(function(value) {
      //   //this.hash = value.data.hash;
      //   //console.log(value.data.hash);
      //   return value.data.hash;
      //   //let userHash = value.data.hash;
      //   //buyVtx();
      // });
      // console.log(a);
      // console.log(userHash);
      // console.log(hashResult.resolve());
      this.buyVtx();
    },
    async buyVtx() {
      let buyResult = await axios.post("https://zixipay.com/sci/form", {
        merchant: "",
        // custom: this.$store.state.userKey,
        custom: "",
        amount: 123,
        currency: "USD",
        hash: this.userHash
      });
      console.log(buyResult);
      // hashResult.then(function(value) {
      //   this.hash = value.data.hash;
      // });
    },
    async getSummaryData() {
      let results = await axios.get("https://volentix-cf.tekstackapps.com/public/api/summary/");
      console.log(results.data);
      this.summaryData = results.data;
      this.summaryData.priceInBtc = this.summaryData.current_price / 100000000;
      this.summaryData.has_additional_bonus = false;
      let i;
      for (i = 0; i < this.summaryData.additional_bonus.length; i++) {
        const bonus = this.summaryData.additional_bonus[i];
        if (bonus.bonus !== 0) {
          this.summaryData.has_additional_bonus = true;
          break;
        }
      }
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" + JSON.stringify(this.summaryData));
    }
  },
  created: function() {
    this.getSummaryData();
  }
};
</script>

<style scoped>
.button {
  border-radius: 0.6rem;
  width: 9rem;
}
input {
  border-radius: 0.7rem;
}
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
.has-blur-background {
  background-image: url(~@/assets/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
