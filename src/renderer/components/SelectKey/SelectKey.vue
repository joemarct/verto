<template>
  <section>
    <div class="hero-body select-key p-md">
      <div class="container font-gibson m-t-lg p-sm">
        <p class="is-size-4 font-gibson-semibold">
          Key Manager
        </p>
        <br>
        <div class="level is-mobile m-t-md">
          <div class="has-text-dark level-left">
            <a class="button m-t-md green is-centered has-text-white" @click="showAddKey = !showAddKey">
              <p class="is-size-6">
                Add A Public Key
              </p>
            </a>
          </div>
          <div class="has-text-dark level-right">
            <a class="button m-t-md green is-centered has-text-white" @click="generateKey">
              <p>
                Create A New Key Pair
              </p>
            </a>
          </div>
        </div>
        <div v-if="showAddKey">
          <form>
            <input v-model="keyname" class="input m-b-sm" type="text" placeholder="Key Name">
            <input v-model="publicKey" class="input m-b-sm" type="text" placeholder="Paste your key here">
            <div class="level-item has-text-centered is-marginless">
                <a class="button is-fullwidth is-primary has-text-white" @click="addpublickey"> Submit </a>
            </div>
          </form>
          <div v-if="missingInput">
            <p class="has-text-danger m-t-md">
              You must supply both a name and the key.
            </p>
          </div>
          <div v-if="keyalreadysaved">
            <p class="has-text-danger m-t-md">
              The name or the key has already been used.
            </p>
          </div>
        </div>
        <br>
        <div>
        </div>
        <div v-if="existingKeys.length > 0">
          <p class="m-t-lg font-gibson-semibold is-size-5">
            Select A Key
          </p>
          <div class="keys-container">
            <ul>
              <div v-for="key in existingKeys" class="keys-list m-t-md">
                <li>
                  <font-awesome-icon icon="key" class="fa-sm has-text-primary m-l-sm"/>
                  <a class="is-size-6 m-md key" @click="openMain(key.key)"> {{ key.name }} </a>
                  <a @click="deleteKey(key.key)">
                    <font-awesome-icon icon="trash" class="fa-md has-text-grey-light m-l-sm trash-bin is-pulled-right m-r-sm"/>
                  </a>
                </li>
              </div>
            </ul>
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
    this.retrieveKeys();
  },
  methods: {
    openMain: function(address) {
      console.log("ADDRESS: " + address);
      this.$store.commit("save", address);
      this.$router.push({ path: "main" });
    },
    retrieveKeys() {
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
    addpublickey: function() {
      this.keyalreadysaved = false;
      this.missingInput = false;
      if (this.keyname === "" || this.publicKey === "") {
        this.missingInput = true;
        return;
      }
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      const databack = fs.readFileSync(filePath, 'utf-8');
      const config = JSON.parse(databack);
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
    deleteKey(key) {
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      const databack = fs.readFileSync(filePath, 'utf-8');
      const config = JSON.parse(databack);
      // console.log("Old config: " + config);
      let keyIndex;
      let newKeysArray = {password: config.password, keys: []};
      for (let i = 0; i < config.keys.length; i++) {
        if (config.keys[i].key !== key) {
          newKeysArray.keys.push({name: config.keys[i].name, key: config.keys[i].key});
          // keyIndex = i;
        }
      }
      fs.writeFile(filePath, JSON.stringify(newKeysArray), 'utf-8', () => {
        console.log("Deleted")
      });
      for (let i = 0; i < this.existingKeys.length; i++) {
        if (this.existingKeys[i].key === key) {
          // newKeysArray.keys.push({name: config.keys[i].name, key: config.keys[i].key});
          keyIndex = i;
        }
      }
      this.existingKeys.splice(keyIndex, 1);
      // console.log("Updated config, deleting" + keyIndex + " element: " + this.existingKeys);
      // this.retrieveKeys();
      // console.log(newKeysArray);
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
          let out = sjcl.hash.sha256.hash(this.userPassword)
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
.hero-body.select-key {
  background-color: #f7f7fa !important;
}
.hero-body.select-key .font-gibson-semibold {
  color: #454f63;
}
.hero-body.select-key .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.hero-body.select-key .keys-list {
  border-bottom: solid 1px hsl(0, 0%, 86%);
  padding: 0.5rem !important;
}
.hero-body.select-key .keys-container {
  overflow-y: scroll;
  height: 90vw;
}
.hero-body.select-key .key:hover {
  color: hsl(171, 100%, 41%) !important;
}
.hero-body.select-key .trash-bin:hover {
  color: hsl(171, 100%, 41%) !important;
  cursor: pointer;
}
.hero-body.select-key .button.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 1pt !important;
  border-radius: 0.5rem;
  height: 2.5rem;
  width: 100%;
}
.hero-body.select-key .button.is-primary {
  height: 3rem;
}
.hero-body.select-key .choose-file {
  border-radius: 0.5rem;
}
.hero-body.select-key .button.green p {
  color: #ffffff !important;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.hero-body.select-key input {
  border-radius: 0.5rem;
}
</style>
