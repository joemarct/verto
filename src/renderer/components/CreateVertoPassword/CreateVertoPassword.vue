<template>
  <section>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="p-t-xl">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/keepyourkeyssafe">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~@/assets/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <a @click="isInstructionsActive = true">
        <font-awesome-icon icon="question-circle" class="fa-lg has-text-grey-light  is-pulled-right m-r-sm"/>
      </a>
        <br>
        <br>
        <div class="field">
          <div class="control">
            <div v-if="notMatchingPass">
              <p class="has-text-danger m-t-md">
                {{ $t('CreateVertoPassword.mustmatch') }}
              </p>
            </div>
            <input v-model="userPassword" :class="{ 'is-danger' : notMatchingPass }" class="input is-medium" type="password" :placeholder="$t('CreateVertoPassword.vertopassword')">
            <input v-model="checkPassword" :class="{ 'is-danger' : notMatchingPass }" class="input m-t-md is-medium" type="password" :placeholder="$t('CreateVertoPassword.confirm')">
          </div>
        </div>
        <div v-if="fillAllFields">
          <p class="has-text-danger m-t-md">
            {{ $t('CreateVertoPassword.fillall') }}
          </p>
        </div>
        <br><br>
        <div class="has-text-dark m-t-xxl">
          <a class="button m-t-md is-size-5 green is-pulled-right" @click="savePassword">
            <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">{{ $t('CreateVertoPassword.save') }}</p>
          </a>
        </div>
      </div>
      <b-modal :active.sync="isInstructionsActive">
        <div class="card">
          <div class="card-content">
            <div class="modal-header">
              <slot name="header">
                {{ $t('CreateVertoPassword.addwallet') }}
              </slot>
            </div>
            <div>
              {{ $t('CreateVertoPassword.onlysupport') }}
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                {{ $t('CreateVertoPassword.createwallet') }}
              </slot>
            </div>
            <div>
              <p v-html="$t('CreateVertoPassword.createkey')"></p>
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                {{ $t('CreateVertoPassword.wallets') }}
              </slot>
            </div>
            <div>
              {{ $t('CreateVertoPassword.choose') }}
            </div>
            <div class="modal-header">
              <slot name="header">
                {{ $t('CreateVertoPassword.delete') }}
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  {{ $t('CreateVertoPassword.trash') }} <font-awesome-icon icon="trash" class="fa-md has-text-grey-light m-l-sm trash-bin is-pulled-right m-r-sm"/>
                </li>
                <li>
                  {{ $t('CreateVertoPassword.enter') }}
                </li>
                <li>
                  <p v-html="$t('CreateVertoPassword.note')"></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
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
      isInstructionsActive: false
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
          const payload = JSON.stringify({keys: []});
          const router = this.$router;
          const store = this.$store;
          fs.writeFile(filePath, sjcl.encrypt(this.userPassword, payload), 'utf-8', () => {
            store.dispatch("login", true);
            router.push({ path: "walletmanager" });
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
.modal-header {
  margin-top: 0;
  color: #42b983;
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
