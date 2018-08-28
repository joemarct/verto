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
          <div class="columns is-marginless is-mobile has-background-darkgreen p-l-lg p-r-lg p-t-sm p-b-sm" >
            <div class="column is-11 is-paddingless wallet-address is-size-7 font-calibri">
              Wallet address: 123dbdstsdfwe23234df9948sdfdse8b8dweb8sdfwe8df8we
            </div>
            <div class="column is-1 is-paddingless has-text-right line-height-md">
              <font-awesome-icon icon="copy" class="is-size-7 has-text-white" @click="copiedClicked" />
            </div>
          </div>
        </div>
      </Div>
    </div>
    <div class="hero-body is-paddingless">
      <div class="container p-l-lg p-r-lg">
        &nbsp;
      </div>
    </div>
    <div class="hero-foot">
      <div class="container">
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

library.add(faSlidersH, faSyncAlt, faCopy);

Vue.component("font-awesome-icon", FontAwesomeIcon);

export default {
  data() {
    return {
      messages: ""
    };
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
</style>
