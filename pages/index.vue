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
            </div>
          </div>
        </div>
        <div class="navbar-end">
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
export default {
  data() {
    return {
      messages: ""
    };
  },
  methods: {
    async createWallet() {
      this.invoke("/v1/wallet/create", "new_wallet");
    },
    async listWallets() {
      this.invoke("/v1/wallet/list_wallets");
    },
    async invoke(name, data) {
      this.addMessage(`Calling ${name} ...`);
      try {
        const resp = await this.$axios.$post(name, data);
        this.addMessage(resp);
        return resp;
      } catch (e) {
        const response = e.response;
        this.addMessage("ERROR " + response.status);
        this.addMessage(JSON.stringify(response.data.error, null, 2));

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
