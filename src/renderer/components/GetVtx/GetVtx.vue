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
            GetVtx: {{ nativeChainName }}
            <div class="level-right has-text-centered">
              <a @click="isCardModalActive = true">
                <qrcode :value="nativeChainAddress" :options="{ size: 120 }" class="has-text-centered"></qrcode>
              </a>
            </div>
            <div class="columns is-marginless is-mobile has-background-darkgreen p-l-lg p-r-lg p-t-sm p-b-sm has-text-centered">
              <b-tooltip :label="wallet" position="is-bottom" class="m-l-lg" type="is-white" style="width:80%">
                <div class="column is-11 is-paddingless wallet-address is-size-7 font-calibri">
                  {{ $t('Main.address') }}:
                  <span id="wallet-address">{{ nativeChainAddress }}</span>
                </div>
              </b-tooltip>
              <div class="column is-1 is-paddingless has-text-right line-height-md">
                <a v-clipboard:copy="nativeChainAddress" id="button-copy-wallet-address" @click="toast">
                  <font-awesome-icon icon="copy" class="is-size-7 has-text-white"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      nativeChainAddress: null,
      validUntil: null,
      nativeChainName: null
    };
  },
  created() {
    this.nativeChainAddress = this.$route.query.native_chain_address;
    this.validUntil = this.$route.query.valid_until;
    this.nativeChainName = this.$route.query.native_chain_name;
    console.log("Native Chain Address: " + this.nativeChainAddress);
    console.log("valid_until: " + this.validUntil);
  },
  methods: {
    toast() {
      this.$toast.open({
        type: "is-white",
        message: this.$t('Main.copied'),
        duration: 2000
      });
    }
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
.wallet-address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
}
</style>
