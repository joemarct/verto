<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm">
      <div class="p-t-xl p-l-lg">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/generateKey">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~/static/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
        <div class="is-pulled-right is-vcentered is-flex m-t-md p-r-lg">
          <router-link to="/settings">
            <font-awesome-icon icon="sliders-h" class="is-size-5 has-text-aqua" flip="horizontal"/>
          </router-link>
        </div>
      </div>
      <p class="p-t-lg p-l-lg has-text-aqua is-size-4">
        Store Keys
      </p>
      <div class="column list-item font-gibson has-text-white">
        <p class="is-size-6 has-text-grey p-t-md p-l-sm">Active:</p>
        <div class="wallet-address">
          <span class="is-size-7 has-text-aqua p-l-sm">Private: </span>
          <span class="size-font-wallet has-text-white p-l-sm"> {{ activePrivateKey }} </span>
        </div>
        <div class="wallet-address">
          <span class="is-size-7 has-text-aqua p-l-sm">Public: </span>
          <span class="size-font-wallet has-text-white p-l-sm"> {{ activePublicKey }} </span>
        </div>
        <p class="is-size-6 has-text-grey p-t-sm p-l-sm">Owner:</p>
        <div class="wallet-address">
          <span class="is-size-7 has-text-aqua p-l-sm">Private: </span>
          <span class="size-font-wallet has-text-white p-l-sm"> {{ ownerPrivateKey }} </span>
        </div>
        <div class="wallet-address">
          <span class="is-size-7 has-text-aqua p-l-sm">Public: </span>
          <span class="size-font-wallet has-text-white p-l-sm"> {{ ownerPublicKey }} </span>
        </div>
      </div>
      <div class="p-t-lg p-l-md has-text-white is-size-6">
        <input id="print" v-model="checkedOptions" type="checkbox" value="a" @click="checkOptions">
        <label for="print">
          Print to file
        </label>
        <br>
        <input id="save" v-model="checkedOptions" type="checkbox" value="b" @click="checkOptions">
        <label for="save">
          Save to file
        </label>
        <br>
        <input id="copy" v-model="checkedOptions" type="checkbox" value="c" @click="checkOptions">
        <label class="checkbox">
          Copy
        </label>
        <br>
        <input id="qr" v-model="checkedOptions" type="checkbox" value="d" @click="checkOptions">
        <label class="checkbox">
          QR code
        </label>
        <br>
        <input id="writing" v-model="checkedOptions" type="checkbox" value="e" @click="checkOptions">
        <label class="checkbox">
          Writing
        </label>
      </div>
      <div class="p-l-lg p-r-lg has-text-white">
        <a :disabled="disableButton" class="button is-primary m-t-md is-fullwidth m-t-xl is-size-5" @click="goToNext">
          <p class="p-l-md p-r-md has-text-white">Next</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSyncAlt,
  faArrowLeft,
  faSlidersH
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSyncAlt, faArrowLeft, faSlidersH);

Vue.component("font-awesome-icon", FontAwesomeIcon);
export default {
  data() {
    return {
      activePrivateKey: "",
      activePublicKey: "",
      ownerPrivateKey: "",
      ownerPublicKey: "",
      disableButton: true,
      checkedOptions: [],
      goToNextPage: false,
      checkedNumber: 0
    };
  },
  mounted() {
    this.generateActiveKeys();
    this.generateOwnerKeys();
  },
  methods: {
    generateActiveKeys() {
      let app = require("electron").remote.app;
      let basepath = app.getAppPath().replace("app.asar", "");
      // using exec
      let command = basepath + "/resources/cleos create key --to-console";
      let exec = require("child_process").exec;
      let child = exec(command);
      child.stdout.on("data", data => {
        let outputArray = data.split("\n");
        let privateKeyArray = outputArray[0].split(" ");
        let publicKeyArray = outputArray[1].split(" ");
        this.activePrivateKey = privateKeyArray[2];
        this.activePublicKey = publicKeyArray[2];
        //console.log(data.split("\n"));
      });
      child.stderr.on("data", data => {
        this.userKeys = data;
      });
    },
    generateOwnerKeys() {
      let app = require("electron").remote.app;
      let basepath = app.getAppPath().replace("app.asar", "");
      // using exec
      let command = basepath + "/resources/cleos create key --to-console";
      let exec = require("child_process").exec;
      let child = exec(command);
      child.stdout.on("data", data => {
        let outputArray = data.split("\n");
        let privateKeyArray = outputArray[0].split(" ");
        let publicKeyArray = outputArray[1].split(" ");
        this.ownerPrivateKey = privateKeyArray[2];
        this.ownerPublicKey = publicKeyArray[2];
      });
      child.stderr.on("data", data => {
        this.userKeys = data;
      });
    },
    goToNext() {
      if (this.disableButton === true) {
        window.alert("Select at least one option to save your keys");
      } else {
        //this.$router.push({ path: "signUpWithGatewayProvider" });
        let key = this.activePublicKey;
        this.$router.push({
          name: "signUpWithGatewayProvider",
          params: { key }
        });
      }
    },
    checkOptions() {
      this.checkedNumber += 1;
      if (this.checkedOptions.length >= 0) {
        this.disableButton = false;
      } else {
        this.disableButton = true;
      }
    }
  }
};
</script>

<style>
.size-font-wallet {
  font-size: 0.6rem;
}
.button {
  border-radius: 0.6rem;
}
.button {
  background-color: hsl(0, 0%, 71%);
  border-color: hsl(0, 0%, 71%);
  cursor: pointer;
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
.copy-button {
  width: 100%;
}
.has-blur-background {
  background-image: url(~/static/img/transaction-back-screen.jpg);
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
