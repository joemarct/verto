<template>
  <section>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg p-r-md">
      <div class="p-t-xl">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/settings">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~@/assets/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
        <a @click="isInstructionsActive = true">
          <font-awesome-icon icon="question-circle" class="fa-lg has-text-grey-light  is-pulled-right m-r-sm"/>
        </a>
        <br>
        <div class="columns">
          <div class="column is-one-third">
            <div class="left-nav-bar has-text-white">
             <span class="p-l-lg has-text-white is-size-5">
                <router-link to="/whitelist">
                  Whitelist
                </router-link>
              </span>
              <br>
              <br>
              <span class="p-l-lg has-text-white is-size-5">
                <router-link to="/walletmanager">
                  Wallet Manager
                </router-link>
              </span>
              <br>
              <br>
              <span class="p-l-lg has-text-white is-size-5">
                <router-link to="/changevertopassword">
                  Change Password
                </router-link>
              </span>
              <br>
              <br>
              <div @click="logout">
                <span class="p-l-lg has-text-white is-size-5">
                  Logout
                </span>
              </div>
              <hr>
              <a class="p-l-lg has-text-white is-size-5" @click="openTelegram">
                <!--<font-awesome-icon icon="telegram" class="fa-sm has-text-white m-l-sm"/>-->
                Telegram
              </a>
              <br>
              <br>
              <a class="p-l-lg has-text-white is-size-5" href="mailto:someone@example.com?Subject=Hello%20again" target="_top">
                Send Mail
              </a>
            </div>
          </div>
          <div class="column">
            <div class="wallets-list">
            <div class="level is-mobile m-t-md">
              <div class="has-text-dark level-left">
                <a class="button m-t-md green is-centered has-text-white" @click="showAddKey = !showAddKey">
                  <p class="is-size-5">
                    Add Wallet
                  </p>
                </a>
              </div>
              <div class="has-text-dark level-right">
                <a class="button m-t-md green is-centered has-text-white" @click="generateKey">
                  <p class="is-size-5">
                    Create Wallet
                  </p>
                </a>
              </div>
            </div>
            <div v-if="showAddKey">
              <form>
                <div v-if="keyalreadysaved">
                  <p class="has-text-danger m-t-md">
                    The name or the wallet has already been used.
                  </p>
                </div>
                <div v-if="missingInput">
                  <p class="has-text-danger m-t-md">
                    You must supply both a name and the public key for the wallet.
                  </p>
                </div>
                <input v-model="keyname" class="input m-b-sm" type="text" placeholder="Wallet Name">
                <input v-model="publicKey" class="input m-b-sm" type="text" placeholder="Wallet Public Key Here">
                <input v-model="walletpassword" class="input m-b-sm" type="password" placeholder="Verto Password">
                <div v-if="incorrectPassword">
                  <p class="has-text-danger m-t-md">
                    The Password Is Incorrect.
                  </p>
                </div>
                <div class="level-item has-text-centered is-marginless">
                    <a class="button is-fullwidth is-primary has-text-white" @click="addpublickey"> Submit </a>
                </div>
              </form>
            </div>
            <div v-if="existingKeys.length > 0">
              <div class="has-text-centered">
                <p class="m-t-lg font-gibson-semibold is-size-3 has-text-white">
                  Wallets
                </p>
              </div>
              <br>
              <div v-if="showdeletekeypassword">
                <div v-if="incorrectdeletekeypassword">
                  <p class="has-text-danger m-t-md">
                    The Password Is Incorrect.
                  </p>
                </div>
                <input v-model="deletekeypassword" class="input m-b-sm" type="password" placeholder="Verto Password">
                <div v-if="lastwarningBeforeDelete">
                  <p class="has-text-danger m-t-md is-size-5">
                    Verto cannot recover the wallet once deleted. Press the delete button again for final deletion.
                  </p>
                </div>
                <div class="level is-mobile m-t-md">
                  <div class="has-text-dark level-left">
                    <a class="button m-t-md green is-centered has-text-white" @click="cancelDeleteKey">
                      <p class="is-size-5">
                        Cancel
                      </p>
                    </a>
                  </div>
                  <div class="has-text-dark level-right">
                    <a class="button m-t-md green is-centered has-text-white" @click="removeKey">
                      <p class="is-size-5">
                        Delete
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              <div class="keys-container">
                <ul>
                  <div v-for="key in existingKeys" class="keys-list m-t-md">
                    <li>
                      <font-awesome-icon icon="key" class="fa-sm has-text-primary m-l-sm"/>
                      <a class="is-size-5 m-md key has-text-white" @click="openMain(key.key)"> {{ key.name }} </a>
                      <a @click="deleteKey(key.name)">
                        <font-awesome-icon icon="trash" class="fa-md has-text-grey-light m-l-sm trash-bin is-pulled-right m-r-sm"/>
                      </a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isInstructionsActive">
        <div class="card">
          <div class="card-content">
            <div class="modal-header">
              <slot name="header">
                Add Wallet
              </slot>
            </div>
            <div>
              For now, Verto only supports the ability to add public keys. To add a wallet, simply provide a name, the wallet address, and the Verto password to add your wallet.
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                Create Wallet
              </slot>
            </div>
            <div>
              Create public/private key pairs for a new wallet. Note that <b>ONLY</b> the public key is stored in Verto. You are responsible for the management of your own private key, its storage, and security.
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                Wallets
              </slot>
            </div>
            <div>
              Choose to open a wallet by simple clicking on its name.
            </div>
            <div class="modal-header">
              <slot name="header">
                Delete Wallet
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  Click on the 'Trash' icon <font-awesome-icon icon="trash" class="fa-md has-text-grey-light m-l-sm trash-bin is-pulled-right m-r-sm"/>
                </li>
                <li>
                  Enter your password.
                </li>
                <li>
                  <b>NOTE:</b> Vero is unable to recover deleted wallets.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </section>
</template>

<script>
import sjcl from "sjcl";

export default {
  data() {
    return {
      userPassword: "",
      checkPassword: "",
      notMatchingPass: false,
      fillAllFields: false,
      keyname: "",
      publicKey: "",
      showAddKey: false,
      missingInput: false,
      keyalreadysaved: false,
      existingKeys: [],
      incorrectPassword: false,
      walletpassword: "",
      showdeletekeypassword: false,
      deletekeypassword: "",
      keyfordelete: "",
      incorrectdeletekeypassword: false,
      isInstructionsActive: false,
      lastwarningBeforeDelete: false
    };
  },
  mounted() {
    this.existingKeys = this.$store.state.keys;
  },
  methods: {
    openvideo: function() {
      var open = require("open");
      open("https://www.youtube.com/embed/u8qDkInJHaI");
    },
    openMain: function(address) {
      this.$store.commit("save", address);
      this.$router.push({ path: "main" });
    },
    addpublickey: function() {
      this.incorrectPassword = false;
      this.keyalreadysaved = false;
      this.missingInput = false;
      if (this.keyname === "" || this.publicKey === "") {
        this.missingInput = true;
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
        if (key.name.toLowerCase() === this.keyname.toLowerCase() || key.key === this.publicKey) {
          this.keyalreadysaved = true;
          return;
        }
      }
      config.keys.push({name: this.keyname, key: this.publicKey});
      this.$store.dispatch("setKeys", config.keys);
      this.existingKeys = this.$store.state.keys;
      fs.writeFileSync(filePath, sjcl.encrypt(this.walletpassword, JSON.stringify(config)), 'utf-8');
      this.walletpassword = "";
      this.existingKeys = config.keys;
      this.showAddKey = false;
    },
    generateKey: function() {
      this.$router.push({ path: "keepyourkeyssafe" });
    },
    deleteKey(key) {
      this.keyfordelete = key;
      this.showdeletekeypassword = true;
      this.lastwarningBeforeDelete = false;
    },
    cancelDeleteKey() {
      this.keyfordelete = "";
      this.deletekeypassword = "";
      this.showdeletekeypassword = false;
      this.lastwarningBeforeDelete = false;
    },
    removeKey() {
      this.incorrectdeletekeypassword = false;
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      const databack = fs.readFileSync(filePath, 'utf-8');
      let config = {};
      try {
        config = JSON.parse(sjcl.decrypt(this.deletekeypassword, databack));
      } catch (error) {
        this.incorrectdeletekeypassword = true
        return;
      }
      if (this.lastwarningBeforeDelete) {
        let keyIndex;
        let newKeysArray = [];
        for (let i = 0; i < config.keys.length; i++) {
          if (config.keys[i].name !== this.keyfordelete) {
            newKeysArray.push({name: config.keys[i].name, key: config.keys[i].key});
          }
        }
        config.keys = newKeysArray;
        fs.writeFileSync(filePath, sjcl.encrypt(this.deletekeypassword, JSON.stringify(config)), 'utf-8');
        this.existingKeys = newKeysArray;
        this.keyfordelete = "";
        this.deletekeypassword = "";
        this.showdeletekeypassword = false;
      } else {
        this.lastwarningBeforeDelete = true;
      }
    },
    checkBlocktopus: function() {
      console.log(this.blocktopusUrl)
      console.log(__dirname)
    },
    openTelegram: function() {
      var open = require("open");
      open("http://t.me/volentix");
    },
    logout: function() {
      this.$store.dispatch("login", false);
      this.$store.dispatch("setKeys", []);
      this.$router.push({ path: "welcome" });
    }
  }
};
</script>

<style scoped>
.hero-body.select-key {
  background-color: #f7f7fa !important;
}
.hero-head {
  width: 100%;
}
.hero-head .left-nav-bar{
  width: 15rem;
  height: 100%;
  border-right: solid 1px rgba(55, 202, 189, 0.3);
}
.hero-head .wallets-list{
  width: 25rem;
  height: 100%;
}
.modal-header {
  margin-top: 0;
  color: #42b983;
}
.hero-body.select-key .font-gibson-semibold {
  color: #454f63;
}
.hero-body.select-key .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.hero-body.select-key .keys-list {
  border-bottom: solid 1px hsl(0, 0%, 86%);
  padding: 0.5rem !important;
}
.hero-body.select-key .keys-container {
  overflow-y: scroll;
  height: 50vh;
}
.keys-list .key:hover {
  color: hsl(171, 100%, 41%) !important;
}
.keys-list .trash-bin:hover {
  color: hsl(171, 100%, 41%) !important;
  cursor: pointer;
}
.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 1pt !important;
  border-radius: 0.5rem;
  height: 2.5rem;
  width: 100%;
}
.hero-body.select-key .button.is-primary {
  height: 3rem;
}
.hero-body.select-key .choose-file {
  border-radius: 0.5rem;
}
.hero-body.select-key .button.green p {
  color: #ffffff !important;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.hero-body.select-key input {
  border-radius: 0.5rem;
}
</style>
