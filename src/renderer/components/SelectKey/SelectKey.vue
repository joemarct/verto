<template>
  <section>
    <div class="hero-body choose-password p-md">
      <div class="container font-gibson m-t-lg">
        <p class="is-size-4 font-gibson-semibold">
          Key Manager
        </p>
        <br>
        <p class="m-t-lg">
          <a class="" @click="showAddKey = !showAddKey">
            Add A Public Key
          </a>
        </p>
        <div v-if="showAddKey">
          <form>
            <input v-model="keyname" class="input m-b-sm" type="text" placeholder="Key Name">
            <input v-model="publicKey" class="input m-b-sm" type="text" placeholder="Paste your key here">
            <div class="level-item has-text-centered is-marginless">
                <a class="p-t-lg button is-fullwidth is-primary" @click="addpublickey"> Submit </a>
            </div>
          </form>
          <div v-if="missingInput">
            <p class="has-text-danger m-t-md">
              You must supply both a name and the key.
            </p>
          </div>
          <div v-if="keyalreadysaved">
            <p class="has-text-danger m-t-md">
              The name or the key has already been saved.
            </p>
          </div>
        </div>
        <br>
        <div>
          <a class="" @click="generateKey">
            Create A New Key Pair
          </a>
        </div>
        <div v-if="existingKeys.length > 0">
          <p class="m-t-lg">
            Select A Key
          </p>
          <ul>
            <template v-for="key in existingKeys">
                <li><a class="" @click="openMain(key.key)"> {{ key.name }} </a></li>
            </template>
        </ul>
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
      keyname: "",
      publicKey: "",
      showAddKey: false,
      missingInput: false,
      keyalreadysaved: false,
      existingKeys: []
    };
  },
  mounted() {
    let fs = require("fs");
    let path = require("path")
    let electron = require("electron")
    let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
    const databack = fs.readFileSync(filePath, 'utf-8');
    const config = JSON.parse(databack);
    if (!config.keys) {
      return;
    }
    this.existingKeys = config.keys;
    console.log(this.existingKeys)
  },
  methods: {
    openMain: function(address) {
      console.log("ADDRESS: " + address);
      this.$store.commit("save", address);
      this.$router.push({ path: "main" });
    },
    addpublickey: function() {
      this.keyalreadysaved = false;
      this.missingInput = false;
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      const databack = fs.readFileSync(filePath, 'utf-8');
      const config = JSON.parse(databack);
      if (this.keyname === "" || this.publicKey === "") {
        this.missingInput = true;
        return;
      }
      if (!config.keys) {
        config.keys = [];
      }
      let i;
      for (i = 0; i < config.keys.length; i++) {
        const key = config.keys[i];
        if (key.name.toLowerCase() === this.keyname.toLowerCase() || key.key === this.publicKey) {
          this.keyalreadysaved = true;
          return;
        }
      }
      config.keys.push({name: this.keyname, key: this.publicKey});
      this.existingKeys = config.keys;
      fs.writeFile(filePath, JSON.stringify(config), 'utf-8', () => {
        console.log("Written to the file")
      });
    },
    generateKey: function() {
      this.$router.push({ path: "keepyourkeyssafe" });
    },
    savePassword: function() {
      this.notMatchingPass = false;
      this.fillAllFields = false;
      if (this.userPassword.length > 0 && this.checkPassword.length > 0) {
        if (this.userPassword === this.checkPassword) {
          let fs = require("fs");
          let path = require("path")
          let electron = require("electron")
          let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
          var out = sjcl.hash.sha256.hash(this.userPassword)
          const data = {password: sjcl.codec.hex.fromBits(out)}
          fs.writeFile(filePath, JSON.stringify(data), 'utf-8', () => {
            console.log("Written to the file")
            /*
            fs.readFile(filePath, 'utf-8', function read(err, databack) {
              if (err) {
                throw err;
              }
              console.log(databack);
            });
            */
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
