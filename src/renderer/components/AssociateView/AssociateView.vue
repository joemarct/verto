<template>
  <section>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="p-t-xl">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/settings">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~@/assets/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
        <div class="field">
          <div class="control">
            <input v-model="username" class="input is-medium m-t-md" type="password" :placeholder="$t('AssociateView.username')">
            <input v-model="password" class="input m-t-md is-medium" type="password" :placeholder="$t('AssociateView.password')">
          </div>
        </div>
        <div v-if="fillAllFields">
          <p class="has-text-danger m-t-md">
            {{ $t('CreateVertoPassword.fillall') }}
          </p>
        </div>
        <div class="m-t-md">
          <div class="has-text-dark">
            <a class="button m-t-md is-size-5 green" @click="connect">
              <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">{{ $t('WalletManager.submit') }}</p>
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
      username: "",
      password: "",
      fillAllFields: false
    };
  },
  methods: {
    connect() {
      console.log("username: " + this.username);
      console.log("password: " + this.password);
      if (this.username.length === 0 || this.password.length === 0) {
        this.fillAllFields = true;
      } else {
        this.fillAllFields = false;
      }
    }
  }
};
</script>

<style scoped>
.hero-head .button.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 1pt !important;
  border-radius: 0.5rem;
}

.hero-head {
  width: 90%;
}
</style>
