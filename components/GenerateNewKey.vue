<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm">
      <div class="p-t-xl p-l-lg">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/welcome">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~/static/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <p class="p-t-lg p-l-lg has-text-aqua is-size-4">
        Generate New Key
      </p>
      <div class="m-t-lg p-l-lg p-r-lg has-text-white">
        <p class="has-text-grey-light is-size-6">
          Generate key
        </p>
        <router-link to="storeKeys">
          <a class="button m-t-md is-fullwidth m-t-xl is-size-5">
            <p class="p-l-md p-r-md">Generate Key</p>
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSyncAlt,
  faArrowLeft,
  faSlidersH
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faSyncAlt, faArrowLeft, faSlidersH);

Vue.component("font-awesome-icon", FontAwesomeIcon);
export default {};
</script>

<style scoped>
.button {
  border-radius: 0.5rem;
}
.button p {
  color: #223435;
}
.button {
  background-color: hsl(0, 0%, 71%);
  border-color: hsl(0, 0%, 71%);
  cursor: pointer;
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
.copy-button {
  width: 100%;
}
.has-blur-background {
  background-image: url(~/static/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.has-text-aqua {
  color: #2cfee6;
}
.size-smaller {
  font-size: 0.75rem;
}
.is-vcentered {
  align-items: center;
}
.line-height-md {
  line-height: 1rem;
}
.list-item {
  border-bottom: solid 1px rgba(55, 202, 189, 0.3);
  width: 100vw;
}
.hero-foot {
  border-top: solid 1px rgba(55, 202, 189, 0.3);
}
</style>
