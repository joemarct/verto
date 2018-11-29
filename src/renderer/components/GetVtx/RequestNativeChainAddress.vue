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
      <div class="field">
        <div class="control p-md has-text-centered">
          <div class="container has-text-white p-md">
            {{ $t('AllocateNativeChainAddress.title') }}
            <div v-if="noAddressAvailable">
                <p class="has-text-danger m-t-md">
                    {{ $t('AllocateNativeChainAddress.noAddressAvailable') }}
                </p>
            </div>
            <div v-if="pendingTransactionsExist">
                <p class="has-text-danger m-t-md">
                    {{ $t('AllocateNativeChainAddress.pendingTransactionsExist') }}
                </p>
            </div>
            <select class="input m-b-md" v-model="currency">
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
            </select>
          </div>
        </div>
      </div>
      <div class="has-background-darkgreen">
        <a class="button is-fullwidth is-size-5 is-primary" @click="allocateAddress" >
          <p class="p-l-md p-r-md has-text-weight-bold is-size-6">{{ $t('AllocateNativeChainAddress.button') }}</p>
        </a>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      currency: 'BTC',
      noAddressAvailable: false,
      pendingTransactionsExist: false
    };
  },
  methods: {
    async allocateAddress() {
      this.noAddressAvailable = false;
      this.pendingTransactionsExist = false;
      console.log("allocating an address")
      let hashResult = await axios.post(
        process.env.CROWDFUND_URL + "/public/api/initiate-transaction/",
        {
          verto_public_address: this.$store.state.userKey,
          currency: this.currency
        }
      );
      const res = await hashResult;
      if (res.data.success) {
        console.log('success so redirect')
        this.$router.push({ path: "getvtx" })
      } else {
        if (res.data.error_code === 'no_address_available') {
          this.noAddressAvailable = true;
        } else if (res.data.error_code === 'pending_transactions_exist') {
          this.pendingTransactionsExist = true;
        }
      }
    }
  },
  created: function() {
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
