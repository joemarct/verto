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
          <div class="getvtx-header">
            {{ $t('GetVtx.getvtx') }}
          </div>
          <div class="getvtx-subheader">
            {{ nativeChainName }} 
          </div>
          <img src="~@/assets/img/ethereum.jpg" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
          <div class="container has-text-white p-md">
            <div class="level-right has-text-centered">
              <a @click="isCardModalActive = true">
                <qrcode :value="nativeChainAddress" :options="{ size: 120 }" class="has-text-centered"></qrcode>
              </a>
            </div>
            <br>
            <div class="columns is-marginless is-mobile has-background-darkgreen p-l-lg p-r-lg p-t-sm p-b-sm has-text-centered">
              <b-tooltip :label="nativeChainAddress" position="is-bottom" class="m-l-lg" type="is-white" style="width:80%">
                <div class="column is-11 is-paddingless wallet-address is-size-7 font-calibri">
                  <span id="wallet-address">{{ nativeChainAddress }}</span>
                </div>
              </b-tooltip>
              <div class="column is-1 is-paddingless has-text-right line-height-md">
                <a v-clipboard:copy="nativeChainAddress" id="button-copy-wallet-address" @click="toast">
                  <font-awesome-icon icon="copy" class="is-size-7 has-text-white"/>
                </a>
              </div>
            </div>
            <br>
            <countdown :time="timeremaining" :transform="transform">
              <template slot-scope="props">
                <div v-bind:class="{ oneminuteleft: underOneMinuteLeftInTimer, overoneminuteleft: !underOneMinuteLeftInTimer }">
                  <span v-if="!underOneMinuteLeftInTimer">{{ props.minutes }}:</span>
                  {{ props.seconds }}
                </div>
                <div class="getvtx-subheader">
                  {{ $t('GetVtx.available_for') }}
                </div>
              </template>
            </countdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { timingSafeEqual } from 'crypto';

export default {
  data() {
    return {
      nativeChainAddress: null,
      validUntil: null,
      nativeChainName: null,
      timeremaining: 0,
      underOneMinuteLeftInTimer: false
    };
  },
  created() {
    this.nativeChainAddress = this.$route.query.native_chain_address;
    this.validUntil = this.$route.query.valid_until;
    this.nativeChainName = this.$route.query.native_chain_name;
    const serverTime = this.$route.query.server_time;
    this.timeremaining = Date.parse(this.validUntil) - Date.parse(serverTime)
    console.log("UUUUUUUUUUUUU" + this.timeremaining)
  },
  methods: {
    toast() {
      this.$toast.open({
        type: "is-white",
        message: this.$t('Main.copied'),
        duration: 2000
      });
    },
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        const digits = value < 10 ? `0${value}` : value;
        if (key === 'totalMinutes' && value <= 0) {
          console.log(value)
          // this.underOneMinuteLeftInTimer = true;
        } else if (key === 'totalSeconds' && value <= 0) {
          this.$router.push({ path: "main" })
        }
        const word = value < 2 ? key.replace(/s$/, '') : key;
        props[key] = `${digits}`;
      });

      return props;
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
.getvtx-header {
  color: #f4f4f4;
  font-size: 30pt;
}
.overoneminuteleft {
  color: #f4f4f4;
  font-size: 50pt;
}
.oneminuteleft {
  color: red;
  font-size: 100pt;
}
.getvtx-subheader {
  color: #f4f4f4;
  font-size: 17pt;
}
</style>
