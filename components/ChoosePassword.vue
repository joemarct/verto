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
            <!-- <input v-model="userFile" class="input m-b-md is-medium" type="input" placeholder="File"> -->
            <!-- <a class="button choose-file m-t-md is-size-5 is-fullwidth m-b-md" @click="chooseFile">
              <p class="p-l-sm p-r-sm is-size-6 font-gibson-semibold second">{{ filePath }}</p>
            </a> -->
            <div v-if="notMatchingPass">
              <p class="has-text-danger m-t-md">
                Passwords should match
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
      filePath: "Choose file"
    };
  },
  mounted() {
    const ecc = require("eosjs-ecc");
    ecc.randomKey().then(privateKey => {
      this.privateKey = privateKey; // wif
      this.publicKey = ecc.privateToPublic(privateKey); // EOSkey...
      this.$store.commit("save", this.publicKey);
    });
  },
  methods: {
    encrypt() {
      const { dialog } = require("electron").remote;
      this.notMatchingPass = false;
      this.fillAllFields = false;
      if (this.userPassword.length > 0 && this.checkPassword.length > 0) {
        if (this.userPassword === this.checkPassword) {
          let fs = require("fs");
          let encr = sjcl.encrypt(this.userPassword, this.privateKey);
          this.test = sjcl.decrypt(this.userPassword, encr);

          var savePath = dialog.showSaveDialog({
            title: "Choose file"
            // defaultPath: this.userFile
          });
          fs.writeFile(savePath, encr, function(err) {
            if (err) {
              this.test = "Error while saving a file. Try again later.";
            }
          });
          this.$router.push("congratsScreen");
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
