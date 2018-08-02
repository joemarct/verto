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

    <section v-if="wallet" class="container">
      Your public key: {{ wallet.publicKey }}
    </section>

    <footer class="fixed-footer">
      <textarea id="messages" v-model="messages" class="textarea" rows="8" type="text" readonly/>
    </footer>
  </div>
</template>

<script>
// const KEY_WALLET_NAME = "wallet.name";
// const KEY_WALLET_PASSWORD = "wallet.password";

const Store = require("electron-store");
const store = new Store({
  encryptionKey: "j6=NPbpu#i&4=]u+xv_s8a'f^F}Y{ae_h2]Q=]*B"
});

export default {
  data() {
    return {
      messages: "",
      wallet: null, // { name: foo, password: bar }
      isOpened: undefined
    };
  },
  mounted() {
    this.wallet = store.get("wallet", null);
  },
  methods: {
    async createWallet() {
      // TODO Allow the user to set the wallet name
      const name = "my_wallet_" + getRandomInt(1000);
      const password = await this.invoke(
        "/v1/wallet/create",
        JSON.stringify(name)
      );
      await this.openWallet();
      await this.unlockWallet();
      const publicKey = await this.createKeys();

      this.wallet = { name, password, publicKey };
      // store.set(KEY_WALLET_NAME, this.wallet.name);
      // store.set(KEY_WALLET_PASSWORD, this.wallet.password);
      store.set("wallet", this.wallet);
    },
    async listWallets() {
      return this.invoke("/v1/wallet/list_wallets");
    },
    async listPublicKeys() {
      return this.invoke("/v1/wallet/get_public_keys");
    },
    async openWallet() {
      return this.invoke("/v1/wallet/open", JSON.stringify(this.wallet.name));
    },
    async unlockWallet() {
      return this.invoke(
        "/v1/wallet/unlock",
        JSON.stringify([this.wallet.name, this.wallet.password])
      );
    },
    async createKeys() {
      return this.invoke(
        "/v1/wallet/create_key",
        JSON.stringify([this.wallet.name, "K1"])
      );
    },
    async invoke(name, data) {
      this.addMessage(`Calling ${name} (${data}) ...`);
      try {
        const resp = await this.$axios.$post(name, data);
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
    }
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.btn {
  margin: 0 8px;
}
.fixed-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
