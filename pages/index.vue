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
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div v-if="walletName" class="navbar-item">
            Wallet: {{ walletName }}
          </div>
          <div class="navbar-item">
            0 VTX
          </div>
        </div>
      </div>
    </nav>

    <footer class="fixed-footer">
      <textarea id="messages" v-model="messages" class="textarea" rows="8" type="text" readonly/>
    </footer>
  </div>
</template>

<script>
const WALLET_NAME = "wallet.name";
const DEFAULT_WALLET_NAME = "my_wallet";

const Store = require("electron-store");
const store = new Store({
  encryptionKey: "j6=NPbpu#i&4=]u+xv_s8a'f^F}Y{ae_h2]Q=]*B"
});

export default {
  data() {
    return {
      messages: "",
      walletName: null,
      isOpened: undefined
    };
  },
  mounted() {
    this.walletName = store.get(WALLET_NAME, null);
  },
  methods: {
    async createWallet() {
      // TODO Allow the user to set the wallet name
      this.invoke("/v1/wallet/create", JSON.stringify(DEFAULT_WALLET_NAME));
      store.set(WALLET_NAME, DEFAULT_WALLET_NAME);
      this.walletName = DEFAULT_WALLET_NAME;
    },
    async listWallets() {
      this.invoke("/v1/wallet/list_wallets");
    },
    async openWallet() {
      this.invoke("/v1/wallet/open", JSON.stringify(this.walletName));
    },
    async invoke(name, data) {
      this.addMessage(`Calling ${name} ...`);
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
