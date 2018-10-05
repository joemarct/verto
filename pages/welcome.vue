<template>
  <section class="hero is-fullheight wallet-background">
    <div class="hero-body is-paddingless">
      <div class="container p-l-lg p-r-lg p-t-xl has-text-centered">
        <div class="box has-text-white is-radiusless is-shadowless m-t-lg">
          <div class="is-size-3">WELCOME TO</div>
          <div class="logo p-b-sm p-l-lg p-r-lg">
            <img src="~/static/img/white-logo-with-text.png" >
          </div>
          <div class="p-t-md p-b-lg is-size-6">{{ subtitle_message }}</div>
          <div class="is-size-6">{{ join_message }}</div>
        </div>
      </div>
    </div>
    <div class="hero-foot p-b-xl">
      <div class="container">
        <div class="level p-l-lg p-r-lg">
          <form>
            <input v-model="publicKey" class="input m-b-sm" type="text" placeholder="Paste your key here">
            <!-- <router-link :to="{ name: 'main', params: { publicKey } }"> -->
            <div class="level-item has-text-centered is-marginless">
              <a class="p-t-lg button is-fullwidth is-primary" @click="goToMain"> Submit </a>
            </div>
            <!-- </router-link> -->
          </form>
          <a class="has-text-white is-size-5 is-pulled-right has-text-weight-bold" @click="generateKey"> If you don't have a key, click here </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
      this.$router.push({ name: "main", params: { key } });
    },
    generateKey: function() {
      //console.log("terms:", this);
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
.logo img {
  width: 100%;
  max-width: 320px;
}
</style>
