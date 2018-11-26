<template>
  <section>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="p-t-xl">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/keepyourkeyssafe">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~@/assets/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <a @click="isInstructionsActive = true">
        <font-awesome-icon icon="question-circle" class="fa-lg has-text-grey-light  is-pulled-right m-r-sm"/>
      </a>
      <br>
      <br>
    <div class="hero-body save-your-keys">
      <div class="container font-gibson">
        <b-checkbox native-value="write" v-model="isEnabled">
          {{ $t('DisplayKey.understand') }}
        </b-checkbox>

        <div class="column display-keys font-gibson has-text-white p-md m-t-md">
          <div class="generated-keys p-md">
            <a @click="isKeyModalActive = true">
              <div class="wallet-address">
                <span class="is-size-6 has-text-aqua p-l-sm">{{ $t('DisplayKey.private') }}: </span>
                <span class="is-size-7 has-text-white p-l-sm"> {{ privateKey }} </span>
              </div>
              <div class="wallet-address p-t-sm">
                <span class="is-size-6 has-text-aqua p-l-sm">{{ $t('DisplayKey.public') }}: </span>
                <span class="is-size-7 has-text-white p-l-sm"> {{ publicKey }} </span>
              </div>
            </a>
          </div>
        </div>
        <div class="m-t-md">
          <div v-if="keyalreadyused">
            <p class="has-text-danger m-t-md">
              {{ $t('DisplayKey.already') }}
            </p>
          </div>
          <div v-if="keynameempty">
            <p class="has-text-danger m-t-md">
              {{ $t('DisplayKey.mustname') }}
            </p>
          </div>
          <input v-model="keyname" class="input m-b-sm" type="text" :placeholder="$t('DisplayKey.walletname')">
          <div v-if="incorrectPassword">
            <p class="has-text-danger m-t-md">
              {{ $t('Welcome.incorrect') }}
            </p>
          </div>
          <input v-model="walletpassword" class="input m-b-sm" type="password" :placeholder="$t('CreateVertoPassword.vertopassword')">
          <div class="level is-mobile m-t-md">
          <div class="has-text-dark level-left">
            <a  @click="$router.push({ path: 'walletmanager' })" class="button m-t-md green is-centered has-text-white">
              <p class="is-size-6">
                {{ $t('WalletManager.cancel') }}
              </p>
            </a>
          </div>
          <div class="has-text-dark level-right">
            <a :disabled="!isEnabled" class="button m-t-md is-size-5 green is-pulled-right" @click="goToCongratsScreen">
              <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">{{ $t('CreateVertoPassword.save') }}</p>
            </a>
          </div>
        </div>
        </div>
      </div>
      <b-modal :active.sync="isKeyModalActive">
        <div class="card">
          <div class="card-content">
            <p>
              {{ $t('DisplayKey.writedown') }}
            </p>
            <br>
            <p>
              {{ $t('DisplayKey.privkey') }}: {{ privateKey }}
            </p>
            <br>
            <p>
              {{ $t('DisplayKey.pubkey') }}: {{ publicKey }}
            </p>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isInstructionsActive">
        <div class="card">
          <div class="card-content">
            <div class="modal-header">
              <slot name="header">
                {{ $t('DisplayKey.recommended') }}
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  * {{ $t('DisplayKey.goodpen') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.goodpaper') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.polaroid') }}
                </li>
              </ul>
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                {{ $t('DisplayKey.once') }}
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  * {{ $t('DisplayKey.look') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.provisions') }}
                </li>
              </ul>
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                {{ $t('DisplayKey.donot') }}
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  * {{ $t('DisplayKey.fold') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.share') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.picture') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.screenshot') }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
    </div>
    </div>
  </section>
</template>

<script>
import sjcl from "sjcl";

export default {
  data() {
    return {
      isEnabled: false,
      checkedAnswers: 0,
      isKeyModalActive: false,
      privateKey: "",
      publicKey: "",
      requiredText: this.$t('DisplayKey.copied'),
      textInput: "",
      clicked: false,
      keynameempty: false,
      keyalreadyused: false,
      keyname: "",
      walletpassword: "",
      incorrectPassword: false,
      isInstructionsActive: false
    };
  },
  mounted() {
    this.generateKeys();
  },
  methods: {
    generateKeys() {
      const ecc = require("eosjs-ecc");
      ecc.randomKey().then(privateKey => {
        this.privateKey = privateKey; // wif
        this.publicKey = ecc.privateToPublic(privateKey); // EOSkey...
        this.$store.commit("save", this.publicKey);
      });
    },
    goToCongratsScreen() {
      if (!this.isEnabled) {
        return;
      }
      this.keynameempty = false;
      this.keyalreadyused = false;
      this.incorrectPassword = false;
      if (this.keyname === "") {
        this.keynameempty = true;
        return;
      }
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      const databack = fs.readFileSync(filePath, 'utf-8');
      let config = {};
      try {
        config = JSON.parse(sjcl.decrypt(this.walletpassword, databack));
      } catch (error) {
        this.incorrectPassword = true
        return;
      }
      let i;
      for (i = 0; i < config.keys.length; i++) {
        const key = config.keys[i];
        if (key.name.toLowerCase() === this.keyname.toLowerCase()) {
          this.keyalreadyused = true;
          return;
        }
      }
      config.keys.push({name: this.keyname, key: this.publicKey});
      this.$store.dispatch("setKeys", config.keys);
      fs.writeFileSync(filePath, sjcl.encrypt(this.walletpassword, JSON.stringify(config)), 'utf-8');
      this.$store.commit("save", this.publicKey);
      this.$router.push("congratsscreen");
    }
  }
};
</script>

<style scoped>
.display-keys {
  background-color: #162929;
  border-radius: 0.6rem;
  padding: 1rem !important;
}
.modal-header {
  margin-top: 0;
  color: #42b983;
}
.generated-keys {
  background-color: #1a4a48;
  border-radius: 0.6rem;
  border: solid #3acce1 1.2pt;
  overflow-wrap: break-word;
}
.hero-body.save-your-keys {
  background-color: #f7f7fa !important;
  padding-top: 0.3rem !important;
}
.hero-head.save-your-keys {
  background-color: #f7f7fa !important;
}
.save-your-keys .font-gibson-semibold {
  color: #454f63;
}
.hero-body.save-your-keys p.font-gibson-semibold.second {
  color: #ffffff;
}
.hero-body.save-your-keys .button.green {
  background-color: #00a6a6 !important;
}
.hero-body.save-your-keys .button.aqua {
  background-color: #2cfee6 !important;
}
.hero-body.save-your-keys .font-gibson {
  color: #78849e;
  font-size: 10.5pt;
}
.hero-body.save-your-keys .button {
  border-radius: 0.7rem;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.level-left .button {
  width: 10rem;
  height: 3rem;
}
.level-right .button {
  width: 10rem;
  height: 3rem;
}
.container {
  width: 10rem;
}
</style>
