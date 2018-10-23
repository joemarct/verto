<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm">
      <div class="p-l-lg m-t-md">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/main">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~/static/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <div class="p-md m-t-md">
        <p class="has-text-primary is-size-4">
          Buy VTX
        </p>
      </div>
      <div class="field">
        <div class="control p-md has-text-centered">
          <!-- <form method="POST" action="https://zixipay.com/sci/form"> -->
          <form method="POST">
            <input type="hidden" class="input m-b-md" name="merchant" value="M123456">
            <input type="hidden" class="input m-b-md" name="description" value="Testing payment">
            <input type="text" class="input m-b-md" name="amount" placeholder="Amount of VTX">
            <input type="hidden" class="input m-b-md" name="currency" value="USD">
            <input type="hidden" class="input m-b-md" name="custom" value="order number abc">
            <input :value="this.$store.state.userKey" type="text" class="input m-b-md" name="hash">
            <a class="button m-t-md is-size-5 is-primary is-centered">
              <p class="p-l-sm p-r-sm is-size-5">Get VTX</p>
            </a>
          </form>
        </div>
      </div>
      <!-- <iframe src="https://www.zixipay.com"/> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);
export default {};
</script>

<style scoped>
.button {
  border-radius: 0.6rem;
  width: 9rem;
}
input {
  border-radius: 0.7rem;
}
.is-size-custom-header {
  font-size: 1.7rem;
}
.logo {
  height: 3.3rem;
  border-top: solid 0.2rem rgba(55, 202, 189, 0.3);
}
.is-size-vtx-amount {
  font-size: 2.7rem;
}
.has-blur-background {
  background-image: url(~/static/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
