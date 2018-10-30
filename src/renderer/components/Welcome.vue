<template>
  <section class="hero is-fullheight wallet-background">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="box has-text-white is-radiusless is-shadowless">
          <div class="is-size-3">WELCOME TO</div>
          <div class="logo-welcome p-l-lg p-r-lg">
            <img src="~@/assets/img/white-logo-with-text.png" >
          </div>
          <div class="m-t-md is-size-5">{{ subtitle_message }}</div>
          <div class="is-size-6 m-t-md">{{ join_message }}</div>
          <form>
            <input v-model="password" class="input m-b-sm" type="password" placeholder="Password">
            <div class="level-item has-text-centered is-marginless">
              <a class="p-t-lg button is-fullwidth is-primary" @click="login"> Login </a>
            </div>
          </form>
          <div v-if="nopassword">
            <p class="has-text-danger m-t-md">
              No Password Has Been Set For The Wallet. Please Create A Password First.
            </p>
          </div>
          <div v-if="incorrectPassword">
            <p class="has-text-danger m-t-md">
              The Password Is Incorrect.
            </p>
          </div>
          <br>
          <div>
            <a class="has-text-white is-size-6 is-pulled-center has-text-weight-bold" @click="createwalletpassword">
              Create Wallet Password
            </a>
          </div>
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
      subtitle_message:
        "Verto is your gateway to Volentix, with Verto, you can purchase VTX, the native token of the Volentix ecosystem.",
      join_message: "We're glad you've joined us.",
      publicKey: "",
      password: "",
      nopassword: false,
      incorrectPassword: false
    };
  },
  methods: {
    login: function() {
      this.incorrectPassword = false;
      this.nopassword = false;
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      if (!fs.existsSync(filePath)) {
        this.nopassword = true;
      } else {
        const out = sjcl.hash.sha256.hash(this.password)
        const passwordhash = sjcl.codec.hex.fromBits(out);
        const databack = fs.readFileSync(filePath, 'utf-8');
        const config = JSON.parse(databack);
        if (config.password === passwordhash) {
          this.$store.dispatch("login", true);
          this.$router.push({ path: "selectkey" });
        } else {
          this.incorrectPassword = true
        }
      }
    },
    createwalletpassword: function() {
      this.$router.push({ path: "createwalletpassword" });
    }
  }
};
</script>

<style scoped>
.wallet-background {
  height: 100vh;
  background-image: url(~@/assets/img/wallet-bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.box {
  background-color: rgba(0, 0, 0, 0.42);
}
.button {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-radius: 0.5rem;
}
.logo-welcome img {
  width: 100%;
  max-width: 320px;
}
</style>
