<template>
  <div>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="~/assets/img/verto-dark.png" alt="A multi-currency crypto wallet with initial support for EOS &amp; VTX">
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Wallet
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item" @click="createWallet">
                Create
              </a>
              <a class="navbar-item" @click="listWallets">
                List
              </a>
              <a class="navbar-item" @click="openWallet">
                Open
              </a>
              <a class="navbar-item" @click="unlockWallet">
                Unlock
              </a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Keys
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item" @click="listKeyPairs">
                List key pairs
              </a>
              <a class="navbar-item" @click="listPublicKeys">
                List public keys
              </a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div v-if="wallet" class="navbar-item">
            Wallet: {{ wallet.name }}
          </div>
          <div class="navbar-item">
            0 VTX
          </div>
        </div>
      </div>
    </nav>

    <section v-if="wallet" class="section">
      <div class="container">
        <qr :size="200" :text="wallet.publicKey" class="has-text-centered"/>
      </div>
      <div class="container">
        <div class="has-text-centered">
          Your public key: {{ wallet.publicKey }}
        </div>
      </div>
      <div class="container">
        <div>
          <label class="label">URL to EOS node</label>
          <input v-model="eosUrl" class="input" type="url" size="100">
          <button class="button" @click="saveEosUrl">Save</button>
        </div>
      </div>
    </section>

    <footer class="fixed-footer">
      <textarea id="messages" v-model="messages" class="textarea code" rows="8" type="text" readonly/>
    </footer>
  </div>
</template>

<script>
import qr from "vue-qr";

const KEY_WALLET = "wallet";
const KEY_EOS_URL = "eos_url";

const SERVICE_VERTO = "verto.volentix.io";

const DEFAULT_URL = "http://127.0.0.1:8888";

const Store = require("electron-store");
const keytar = require("keytar");

const store = new Store({
  encryptionKey: "j6=NPbpu#i&4=]u+xv_s8a'f^F}Y{ae_h2]Q=]*B"
});

export default {
  components: {
    qr
  },
  data() {
    return {
      messages: "",
      wallet: null, // { name: "wallet_xxx", publicKey: "EOS..."" }
      eosUrl: null
    };
  },
  mounted() {
    this.wallet = store.get(KEY_WALLET, null);
    this.eosUrl = store.get(KEY_EOS_URL, DEFAULT_URL);
  },
  methods: {
    async createWallet() {
      // TODO Allow the user to set the wallet name
      this.wallet.name = "my_wallet_" + getRandomInt(1000);
      const password = await this.invoke(
        "/v1/wallet/create",
        JSON.stringify(this.wallet.name)
      );
      await keytar.setPassword(SERVICE_VERTO, this.wallet.name, password);

      await this.openWallet();
      await this.unlockWallet();
      const publicKey = await this.createKeys();

      this.wallet = {
        name: this.wallet.name,
        publicKey
      };
      store.set(KEY_WALLET, this.wallet);
    },
    async listWallets() {
      return this.invoke("/v1/wallet/list_wallets");
    },
    async listPublicKeys() {
      return this.invoke("/v1/wallet/get_public_keys");
    },
    async listKeyPairs() {
      return this.invoke("/v1/wallet/list_keys");
    },
    async openWallet() {
      return this.invoke("/v1/wallet/open", JSON.stringify(this.wallet.name));
    },
    async unlockWallet() {
      const password = await keytar.getPassword(
        SERVICE_VERTO,
        this.wallet.name
      );
      return this.invoke(
        "/v1/wallet/unlock",
        JSON.stringify([this.wallet.name, password])
      );
    },
    async createKeys() {
      return this.invoke(
        "/v1/wallet/create_key",
        JSON.stringify([this.wallet.name, "K1"])
      );
    },
    async invoke(name, data) {
      const url = this.eosUrl + name;
      this.addMessage(`Calling "${url}"` + (data ? `(${data})` : "") + " ...");
      try {
        const resp = await this.$axios.$post(url, data);
        this.addMessage(JSON.stringify(resp));
        return resp;
      } catch (e) {
        const response = e.response;
        this.addMessage(
          "ERROR " +
            response.status +
            ": " +
            JSON.stringify(response.data.error)
        );

        // TODO log error
        throw e;
      }
    },
    addMessage(message) {
      this.messages += message + "\n";
      this.scrollToEnd();
    },
    scrollToEnd() {
      // FIXME I think the height is calculated before the message is added, and so it doesn't
      // actually scroll to the correct place
      // var messageBox = this.$el.querySelector("#messages");
      // console.log("scrollHeight", messageBox.scrollHeight);
      // messageBox.scrollTop = messageBox.scrollHeight + 10;
    },
    saveEosUrl() {
      store.set(KEY_EOS_URL, this.eosUrl.trim());
      console.log("Set new EOS URL to " + store.get(KEY_EOS_URL));
    }
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
</script>

<style scoped>
.fixed-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.code {
  font-family: "Courier New", Courier, monospace;
  font-size: small;
}
</style>
