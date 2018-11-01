<template>
  <section class="hero is-fullheight is-light is-bold">
    <div class="hero-head top-bg">
      <div class="container font-gibson m-t-lg">
        <div class="p-t-lg p-b-lg has-text-centered">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
            <router-link to="/main">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
            </router-link>
        </div>
        <img src="~@/assets/img/wallet-logo.png" class="logo">
        <div class="is-pulled-right is-vcentered is-flex m-t-md">
            <router-link to="/settings">
            <font-awesome-icon icon="sliders-h" class="is-size-5 has-text-white" flip="horizontal"/>
            </router-link>
        </div>
        </div>
        <p class="is-size-4 font-gibson-semibold">
          Change Verto Password
        </p>
        <p class="m-t-lg">
          Existing Password
        </p>
        <br>
        <div class="field">
          <div class="control">
            <div v-if="incorrectpassword">
              <p class="has-text-danger m-t-md">
                The password is incorrect.
              </p>
            </div>
            <input v-model="originalPassword" :class="{ 'is-danger' : incorrectpassword }" class="input is-medium" type="password" placeholder="Original Password">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <p class="m-t-lg">
              New Password
            </p>
            <div v-if="notMatchingPass">
              <p class="has-text-danger m-t-md">
                Passwords must match.
              </p>
            </div>
            <div v-if="fillAllFields">
              <p class="has-text-danger m-t-md">
                All fields are required.
              </p>
            </div>
            <input v-model="userPassword" :class="{ 'is-danger' : notMatchingPass }" class="input is-medium" type="password" placeholder="Password">
            <input v-model="checkPassword" :class="{ 'is-danger' : notMatchingPass }" class="input m-t-md is-medium" type="password" placeholder="Confirm password">
          </div>
        </div>
        <div class="has-text-dark m-t-xxl">
          <a class="button m-t-md is-size-5 green is-pulled-right" @click="savePassword">
            <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">Save</p>
          </a>
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
      userPassword: "",
      checkPassword: "",
      notMatchingPass: false,
      fillAllFields: false,
      incorrectpassword: false,
      originalPassword: ""
    };
  },
  methods: {
    savePassword: function() {
      this.incorrectpassword = false;
      this.notMatchingPass = false;
      this.fillAllFields = false;
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      const databack = fs.readFileSync(filePath, 'utf-8');
      const config = JSON.parse(databack);
      const out = sjcl.hash.sha256.hash(this.originalPassword)
      const passwordhash = sjcl.codec.hex.fromBits(out);
      if (config.password !== passwordhash) {
        this.incorrectpassword = true
        return;
      }
      if (this.userPassword.length > 0 && this.checkPassword.length > 0) {
        if (this.userPassword === this.checkPassword) {
          const hashedPassword = sjcl.hash.sha256.hash(this.userPassword);
          let fs = require("fs");
          let path = require("path")
          let electron = require("electron")
          let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
          const databack = fs.readFileSync(filePath, 'utf-8');
          const config = JSON.parse(databack);
          config.password = sjcl.codec.hex.fromBits(hashedPassword);
          fs.writeFileSync(filePath, JSON.stringify(config), 'utf-8');
          this.$store.dispatch("login", false);
          this.$router.push({ path: "welcome" });
        } else {
          this.notMatchingPass = true;
        }
      } else {
        this.fillAllFields = true;
      }
    }
  }
};
</script>

<style scoped>
.hero-body.choose-password {
  background-color: #f7f7fa !important;
}
.hero-body.choose-password .font-gibson-semibold {
  color: #454f63;
}
.hero-body.choose-password .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.hero-body.choose-password .button.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 1pt !important;
  border-radius: 0.5rem;
}
.hero-body.choose-password .choose-file {
  border-radius: 0.5rem;
}
.hero-body.choose-password .button.green p {
  color: #ffffff !important;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.hero-body.choose-password input {
  border-radius: 0.5rem;
}
.notices.is-top {
  top: 18rem !important;
  left: 18.5rem;
}
.notices .toast {
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
}
.is-vcentered {
  align-items: center;
}
.top-bg {
  background-image: url(~@/assets/img/wallet-main-top-bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.dark-blue-gradient {
  background: linear-gradient(
    to bottom,
    rgba(41, 137, 216, 0) 0%,
    rgba(255, 255, 255, 0) 10%,
    rgba(34, 52, 53, 1) 100%
  );
}
.w-main-b-graident {
  background: linear-gradient(
    to bottom,
    rgba(34, 52, 53, 1) 0%,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.1) 80%,
    rgba(255, 255, 255, 0) 90%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
.wallet-address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
}
.line-height-md {
  line-height: 1rem;
}
.logo {
  height: 3.5rem;
}
.list-item {
  border-bottom: solid 1px rgba(55, 202, 189, 0.3);
  width: 100vw;
}
.hero-body {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  align-items: flex-start !important;
}
.hero-body > .container {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.hero-foot {
  border-top: none;
}
.hero.is-fullheight .hero-body {
  flex: 1;
}
.hero.is-fullheight {
  height: 100vh;
}
</style>
