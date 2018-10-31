<template>
  <section>
    <div class="hero-body choose-password p-md">
      <div class="container font-gibson m-t-lg">
        <p class="is-size-4 font-gibson-semibold">
          File Storage
        </p>
        <p class="is-size-6 font-gibson has-text-weight-bold m-t-sm">
          Warning
        </p>
        <br>
        <p class="m-t-lg">
          It's recommended to save your keys file on a removable storage
        </p>
        <br>
        <div class="field">
          <div class="control">
            <p>
              Give Your Key A Name
            </p>
            <input v-model="keyname" class="input is-medium m-t-md" type="text" placeholder="Name">
            <div v-if="nokeyname">
              <p class="has-text-danger m-t-md">
                You must provide a key name.
              </p>
            </div>
            <div v-if="keyalreadyused">
              <p class="has-text-danger m-t-md">
                The name or the key has already been used.
              </p>
            </div>
            <div v-if="notMatchingPass">
              <p class="has-text-danger m-t-md">
                Passwords should match
              </p>
            </div>
            <div v-if="fillAllFields">
              <p class="has-text-danger m-t-md">
                Please fill all the fields above
              </p>
            </div>
            <input v-model="userPassword" :class="{ 'is-danger' : notMatchingPass }" class="input is-medium m-t-md" type="password" placeholder="Password">
            <input v-model="checkPassword" :class="{ 'is-danger' : notMatchingPass }" class="input m-t-md is-medium" type="password" placeholder="Confirm password">
            <div v-if="incorrectPassword">
              <p class="has-text-danger m-t-md">
                The Wallet Password Is Incorrect.
              </p>
            </div>
            <input v-model="walletpassword" class="input is-medium m-t-md" type="password" placeholder="Wallet Password">
          </div>
        </div>
        <div class="has-text-dark m-t-xxl">
          <a class="button m-t-md is-size-5 green is-pulled-right" @click="encrypt">
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
      isEnabled: true,
      userFile: "",
      userPassword: "",
      checkPassword: "",
      privateKey: "",
      publicKey: "",
      notMatchingPass: false,
      fillAllFields: false,
      test: "",
      filePath: "Choose file",
      keyname: "",
      keyalreadyused: false,
      nokeyname: false,
      incorrectPassword: false
    };
  },
  mounted() {
    const ecc = require("eosjs-ecc");
    ecc.randomKey().then(privateKey => {
      this.privateKey = privateKey;
      this.publicKey = ecc.privateToPublic(privateKey);
      this.$store.commit("save", this.publicKey);
    });
  },
  methods: {
    encrypt() {
      const { dialog } = require("electron").remote;
      this.notMatchingPass = false;
      this.fillAllFields = false;
      this.keyalreadyused = false;
      this.nokeyname = false;
      this.incorrectPassword = false;
      if (this.keyname === "") {
        this.nokeyname = true;
        return;
      }
      if (this.userPassword.length > 0 && this.checkPassword.length > 0) {
        if (this.userPassword === this.checkPassword) {
          let fs = require("fs");
          let path = require("path")
          let electron = require("electron")
          let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
          const databack = fs.readFileSync(filePath, 'utf-8');
          let config = {};
          try {
            config = JSON.parse(sjcl.decrypt(this.walletpassword, databack));
          } catch (error) {
            this.incorrectPassword = true
            return;
          }
          let i;
          for (i = 0; i < config.keys.length; i++) {
            const key = config.keys[i];
            if (key.name.toLowerCase() === this.keyname.toLowerCase()) {
              this.keyalreadyused = true;
              return;
            }
          }
          var savePath = dialog.showSaveDialog({
            title: "Choose file"
          });
          // TODO: Need some error checking here.
          config.keys.push({name: this.keyname, key: this.publicKey});
          fs.writeFileSync(savePath, sjcl.encrypt(this.walletpassword, this.privateKey));
          fs.writeFileSync(filePath, sjcl.encrypt(this.walletpassword, JSON.stringify(config)), 'utf-8');
          this.$store.commit("save", this.publicKey);
          this.$store.dispatch("setKeys", config.keys);
          this.$router.push("congratsscreen");
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
