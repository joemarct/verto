<template>
  <section class="hero is-fullheight wallet-background">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="box has-text-white is-radiusless is-shadowless">
          <div class="is-size-3">WELCOME TO</div>
          <div class="logo-welcome p-l-lg p-r-lg">
            <img src="~/static/img/white-logo-with-text.png" >
          </div>
          <div class="m-t-md is-size-5">{{ subtitle_message }}</div>
          <div class="is-size-6 m-t-md">{{ join_message }}</div>

          <form>
            <input v-model="publicKey" class="input m-b-sm" type="text" placeholder="Paste your key here">
            <div class="level-item has-text-centered is-marginless">
              <a class="p-t-lg button is-fullwidth is-primary" @click="goToMain"> Submit </a>
            </div>
          </form>
          <div>
            <a class="has-text-white is-size-6 is-pulled-right has-text-weight-bold" @click="generateKey">
              If you don't have a key, click here
            </a>
          </div>

        </div>
      </div>
    </div>
    <!-- <div class="hero-foot p-b-xl">
      <div class="container">
        <div class="level p-l-lg p-r-lg">
          <form>
            <input v-model="publicKey" class="input m-b-sm" type="text" placeholder="Paste your public key here">
            <div class="level-item has-text-centered is-marginless">
              <a class="p-t-lg button is-fullwidth is-primary" @click="goToMain"> Submit </a>
            </div>
          </form>
          <a class="has-text-white is-size-5 is-pulled-right has-text-weight-bold" @click="generateKey"> If you don't have a key, click here </a>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
require("update-electron-app")();
export default {
  data() {
    return {
      subtitle_message:
        "Verto is your gateway to Volentix, with Verto, you can purchase VTX, the native token of the Volentix ecosystem.",
      join_message: "We're glad you've joined us.",
      publicKey: ""
    };
  },
  methods: {
    goToMain: function() {
      let key = this.publicKey;
      this.$store.commit("save", key);
      this.$router.push({ name: "main" });
    },
    generateKey: function() {
      this.$router.push({ path: "generateKey" });
    }
  }
};
</script>

<style scoped>
.wallet-background {
  height: 100vh;
  background-image: url(~/static/img/wallet-bg.jpeg);
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
