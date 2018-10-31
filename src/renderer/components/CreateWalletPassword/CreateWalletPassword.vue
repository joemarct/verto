<template>
  <section>
    <div class="hero-body choose-password p-md">
      <div class="container font-gibson m-t-lg">
        <p class="is-size-4 font-gibson-semibold">
          Create Wallet Password
        </p>
        <br>
        <p class="m-t-lg">
          This password will only unlock your wallet. You should choose separate passwords for the protection of your keys.
        </p>
        <br>
        <div class="field">
          <div class="control">
            <div v-if="notMatchingPass">
              <p class="has-text-danger m-t-md">
                Passwords must match.
              </p>
            </div>
            <input v-model="userPassword" :class="{ 'is-danger' : notMatchingPass }" class="input is-medium" type="password" placeholder="Password">
            <input v-model="checkPassword" :class="{ 'is-danger' : notMatchingPass }" class="input m-t-md is-medium" type="password" placeholder="Confirm password">
          </div>
        </div>
        <div v-if="fillAllFields">
          <p class="has-text-danger m-t-md">
            Please fill all the fields above
          </p>
        </div>
        <br><br>
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
      fillAllFields: false
    };
  },
  methods: {
    savePassword: function() {
      this.notMatchingPass = false;
      this.fillAllFields = false;
      if (this.userPassword.length > 0 && this.checkPassword.length > 0) {
        if (this.userPassword === this.checkPassword) {
          let fs = require("fs");
          let path = require("path")
          let electron = require("electron")
          let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
          const payload = JSON.stringify({keys: [{"name": "First", "key": "EOS8hdL4KK7QPxFLZpCgAA3RjyW3qq5kape4KJNjcbPy2r5FtutiG"}]});
          const router = this.$router;
          const store = this.$store;
          fs.writeFile(filePath, sjcl.encrypt(this.userPassword, payload), 'utf-8', () => {
            store.dispatch("login", false);
            router.push({ path: "welcome" });
          });
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
</style>
