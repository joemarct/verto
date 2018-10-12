<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm">
      <div class="p-t-xl p-l-lg">
        <img src="~/static/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <div class="p-t-lg p-l-lg has-text-aqua is-size-4">
        <span>
          Store Keys
        </span>
        <span class="m-l-xxl">
          <a @click="isCardModalActive = true">
            F.A.Q.
          </a>
        </span>
      </div>
      <!-- <p class="p-t-lg p-l-lg has-text-aqua is-size-4">
        Store Keys
      </p> -->
      <div class="column list-item font-gibson has-text-white p-b-lg">
        <a @click="isKeyModalActive = true">
          <div class="wallet-address">
            <span class="is-size-7 has-text-aqua p-l-sm">Private: </span>
            <span class="size-font-wallet has-text-white p-l-sm"> {{ privateKey }} </span>
          </div>
          <div class="wallet-address">
            <span class="is-size-7 has-text-aqua p-l-sm">Public: </span>
            <span class="size-font-wallet has-text-white p-l-sm"> {{ publicKey }} </span>
          </div>
        </a>
      </div>
      <div class="p-t-lg p-l-md has-text-white is-size-6">
        <p class="p-b-md">
          Please select at least one option to save your keys:
        </p>
        <div class="p-l-sm">
          <b-checkbox v-model="checkedOptions" native-value="print" @change.native="checkOptions">
            Print to file
          </b-checkbox>
          <b-tooltip label="Your keys will be printed. You need to have a printer for this option." position="is-top" size="is-small" type="is-white" multilined animated>
            <font-awesome-icon icon="question-circle" class="is-size-6 option-explanation m-l-sm"/>
          </b-tooltip>
          <br>
          <b-checkbox v-model="checkedOptions" native-value="saveToFile" @change.native="checkOptions">
            Save to file
          </b-checkbox>
          <b-tooltip label="Your keys will be saved in a text file on your machine." position="is-top" size="is-small" type="is-white" multilined animated>
            <font-awesome-icon icon="question-circle" class="is-size-6 option-explanation m-l-sm"/>
          </b-tooltip>
          <!-- </div> -->
          <br>
          <b-checkbox v-model="checkedOptions" native-value="copy" @change.native="checkOptions">
            Copy
          </b-checkbox>
          <b-tooltip label="Your keys will be copied to the clipboard." position="is-top" size="is-small" type="is-white" multilined animated>
            <font-awesome-icon icon="question-circle" class="is-size-6 option-explanation m-l-sm"/>
          </b-tooltip>
          <br>
          <b-checkbox v-model="checkedOptions" native-value="qrcode" @change.native="checkOptions">
            QR code
          </b-checkbox>
          <b-tooltip label="QR code will be generated for your keys." position="is-top" size="is-small" type="is-white" multilined animated>
            <font-awesome-icon icon="question-circle" class="is-size-6 option-explanation m-l-sm"/>
          </b-tooltip>
          <br>
          <b-checkbox v-model="checkedOptions" native-value="write" @change.native="checkOptions">
            Writing
          </b-checkbox>
          <b-tooltip label="You have to write down your keys. It is your responsibility to save the keys." position="is-top" size="is-small" type="is-white" multilined animated>
            <font-awesome-icon icon="question-circle" class="is-size-6 option-explanation m-l-sm"/>
          </b-tooltip>
        </div>
      </div>
      <div class="p-l-lg p-r-lg has-text-dark">
        <a :disabled="disableButton" class="button is-primary m-t-md is-fullwidth m-t-xl is-size-5" @click="goToNext">
          <p class="p-l-md p-r-md">Next</p>
        </a>
      </div>
    </div>
    <b-modal :active.sync="isKeyModalActive">
      <div class="card">
        <div class="card-content">
          <p>
            Make sure you save your keys.
          </p>
          <br>
          <p>
            Private key: {{ privateKey }}
          </p>
          <br>
          <p>
            Public key: {{ publicKey }}
          </p>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="isCardModalActive">
      <div class="card">
        <div class="card-content">
          <p>
            You can import your keys into EOS wallet.
            You need to save your private key to be able to access your wallet.
            You need your public key to make a transaction.
          </p>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="keysAreStored">
      <div class="card">
        <div class="card-content storekeys">
          <p>
            Make sure you saved your keys. You will not see your keys again. You can't access your wallet without them.
          </p>
          <p>
            Your keys:
          </p>
          <br>
          <p>
            Private key: {{ privateKey }}
          </p>
          <br>
          <p>
            Public key: {{ publicKey }}
          </p>
          <a class="button is-primary m-t-lg is-size-6 is-one-third" @click="keysAreStored = false">
            <p class="p-l-md p-r-md">Cancel</p>
          </a>
          <router-link to="/signUpWithGatewayProvider">
            <a class="button is-primary m-t-lg is-size-6 m-l-md">
              <p class="p-l-md p-r-md">I saved my keys</p>
            </a>
          </router-link>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSyncAlt,
  faArrowLeft,
  faSlidersH,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSyncAlt, faArrowLeft, faSlidersH, faQuestionCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);
export default {
  data() {
    return {
      privateKey: "",
      publicKey: "",
      disableButton: true,
      checkedOptions: [],
      goToNextPage: false,
      checkedNumber: 0,
      isCardModalActive: false,
      isKeyModalActive: false,
      keysAreStored: false
    };
  },
  mounted() {
    this.generateKeys();
  },
  methods: {
    generateKeys() {
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
        this.privateKey = privateKeyArray[2];
        this.publicKey = publicKeyArray[2];
        this.$store.commit("save", this.publicKey);
      });
      child.stderr.on("data", data => {
        this.userKeys = data;
      });
    },
    goToNext() {
      if (this.disableButton === true) {
        window.alert("Select at least one option to save your keys");
      } else {
        this.keysAreStored = true;
      }
    },
    checkOptions(event) {
      event.target.checked
        ? (this.checkedNumber += 1)
        : (this.checkedNumber -= 1);
      if (this.checkedNumber > 0) {
        this.disableButton = false;
      } else {
        this.disableButton = true;
      }
    }
  }
};
</script>

<style>
.option-explanation {
  color: rgba(55, 202, 189, 0.3);
  cursor: pointer;
}
.control-label:hover {
  color: #00d1b2;
}
.control-label {
  padding-top: 0.1rem;
}
.option-explanation:hover {
  color: #00d1b2;
}
.button p {
  color: #223435;
}
.storekeys {
  border: solid 0.3rem red;
}
.card-content {
  word-wrap: break-word;
}
.size-font-wallet {
  font-size: 0.6rem;
}
.button {
  border-radius: 0.6rem;
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
  padding-bottom: 2rem !important;
}
.hero-foot {
  border-top: solid 1px rgba(55, 202, 189, 0.3);
}
</style>
