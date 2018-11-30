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
        <div class="control p-md has-text-white p-md">
          <div class="requestaddress-header has-text-centered">
            {{ $t('RequestNativeChainAddress.header') }}
          </div>
          <br>
          <p>
            {{ $t('RequestNativeChainAddress.first_p') }}
          </p>
          <br>
          <p>
            {{ $t('RequestNativeChainAddress.second_p') }}
          </p>
          <br>
          <p>
            {{ $t('RequestNativeChainAddress.third_p') }}
          </p>
          <br>
          <b-checkbox @change.native="buttondisabled = !buttondisabled">
            {{ $t('RequestNativeChainAddress.access') }}
          </b-checkbox>
          <br>
          <br>
          <div class="requestaddress-subheader">
            {{ $t('RequestNativeChainAddress.select_currency') }}
          </div>
          <br>
          <div class="container">
            <div v-if="noAddressAvailable">
                <p class="has-text-danger m-t-md">
                    {{ $t('RequestNativeChainAddress.err_noAddressAvailable') }}
                </p>
            </div>
            <div v-if="pendingTransactionsExist">
                <p class="has-text-danger m-t-md">
                    {{ $t('RequestNativeChainAddress.err_pendingTransactionsExist') }}
                </p>
            </div>
            <div v-if="investorMustWait" class="has-text-centered">
                
                <countdown :time="timeremaining" :transform="transform">
                <template slot-scope="props">
                  <p class="has-text-danger m-t-md">
                    {{ $t('RequestNativeChainAddress.err_investor_must_wait') }}
                </p>
                  <div v-bind:class="{ oneminuteleft: underOneMinuteLeftInTimer, overoneminuteleft: !underOneMinuteLeftInTimer }">
                    {{ props.minutes }}:{{ props.seconds }}
                  </div>
                </template>
              </countdown>
            </div>
            <select class="input m-b-md" v-model="currency">
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
            </select>
          </div>
        </div>
      </div>
      <div class="has-background-darkgreen">
        <a :disabled="buttondisabled" class="button is-fullwidth is-size-5 is-primary" @click="allocateAddress" >
          <p class="p-l-md p-r-md has-text-weight-bold is-size-6">{{ $t('RequestNativeChainAddress.button') }}</p>
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
      pendingTransactionsExist: false,
      investorMustWait: false,
      buttondisabled: true,
      nextAvailableTime: null,
      timeremaining: 0,
      underOneMinuteLeftInTimer: false
    };
  },
  methods: {
    transform(props) {
      let finalMinute = false;
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value;
        if (key === 'totalSeconds' && value <= 20) {
          this.underOneMinuteLeftInTimer = true;
        }
        // uses singular form when the value is less than 2
        const word = value < 2 ? key.replace(/s$/, '') : key;

        props[key] = `${digits}`;
      });

      return props;
    },
    async allocateAddress() {
      if (this.buttondisabled) {
        return;
      }
      this.noAddressAvailable = false;
      this.pendingTransactionsExist = false;
      this.investorMustWait = false;
      let hashResult = await axios.post(
        process.env.CROWDFUND_URL + "/public/api/initiate-transaction/",
        {
          verto_public_address: this.$store.state.userKey,
          currency: this.currency
        }
      );
      const res = await hashResult;
      console.log(res)
      if (res.data.success) {
        this.$router.push({ path: "begingetvtx" })
      } else {
        if (res.data.error_code === 'no_address_available') {
          this.noAddressAvailable = true;
        } else if (res.data.error_code === 'pending_transactions_exist') {
          this.pendingTransactionsExist = true;
        } else if (res.data.error_code === 'investor_must_wait') {
          const waitUntil = res.data.data.next_available_time
          const serverTime = res.data.data.server_time;
          this.timeremaining = Date.parse(waitUntil) - Date.parse(serverTime)
          this.investorMustWait = true;
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
.requestaddress-header {
  color: #f4f4f4;
  font-size: 30pt;
}
.requestaddress-subheader {
  color: #f4f4f4;
  font-size: 17pt;
}
.overoneminuteleft {
  color: #f4f4f4;
  font-size: 30pt;
}
.oneminuteleft {
  color: red;
  font-size: 30pt;
}
.has-blur-background {
  background-image: url(~@/assets/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
