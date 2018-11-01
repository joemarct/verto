<template>
  <section>
    <div class="hero-body select-key p-md">
      <div class="container font-gibson m-t-lg p-sm">
        <p class="is-size-4 font-gibson-semibold">
          Key Manager
        </p>
        <br>
        <a @click="openvideo()">
          Watch Video
        </a>
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
            <div v-if="keyalreadysaved">
              <p class="has-text-danger m-t-md">
                The name or the key has already been used.
              </p>
            </div>
            <div v-if="missingInput">
              <p class="has-text-danger m-t-md">
                You must supply both a name and the key.
              </p>
            </div>
            <input v-model="keyname" class="input m-b-sm" type="text" placeholder="Key Name">
            <input v-model="publicKey" class="input m-b-sm" type="text" placeholder="Paste your key here">
            <input v-model="walletpassword" class="input m-b-sm" type="password" placeholder="Wallet Password">
            <div v-if="incorrectPassword">
              <p class="has-text-danger m-t-md">
                The Password Is Incorrect.
              </p>
            </div>
            <div class="level-item has-text-centered is-marginless">
                <a class="button is-fullwidth is-primary has-text-white" @click="addpublickey"> Submit </a>
            </div>
          </form>
        </div>
        <br>
        <div>
        </div>
        <div v-if="existingKeys.length > 0">
          <p class="m-t-lg font-gibson-semibold is-size-5">
            Select A Key
          </p>
          <div v-if="showdeletekeypassword">
            <div v-if="incorrectdeletekeypassword">
              <p class="has-text-danger m-t-md">
                The Password Is Incorrect.
              </p>
            </div>
            <input v-model="deletekeypassword" class="input m-b-sm" type="password" placeholder="Wallet Password">
            <div class="level is-mobile m-t-md">
              <div class="has-text-dark level-left">
                <a class="button m-t-md green is-centered has-text-white" @click="cancelDeleteKey">
                  <p class="is-size-6">
                    Cancel
                  </p>
                </a>
              </div>
              <div class="has-text-dark level-right">
                <a class="button m-t-md green is-centered has-text-white" @click="removeKey">
                  <p>
                    Delete
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div class="keys-container">
            <ul>
              <div v-for="key in existingKeys" class="keys-list m-t-md">
                <li>
                  <font-awesome-icon icon="key" class="fa-sm has-text-primary m-l-sm"/>
                  <a class="is-size-6 m-md key" @click="openMain(key.key)"> {{ key.name }} </a>
                  <a @click="deleteKey(key.name)">
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
      existingKeys: [],
      incorrectPassword: false,
      walletpassword: "",
      showdeletekeypassword: false,
      deletekeypassword: "",
      keyfordelete: "",
      incorrectdeletekeypassword: false
    };
  },
  mounted() {
    this.existingKeys = this.$store.state.keys;
  },
  methods: {
    openvideo: function() {
      var open = require("open");
      open("https://www.youtube.com/embed/u8qDkInJHaI");
    },
    openMain: function(address) {
      this.$store.commit("save", address);
      this.$router.push({ path: "main" });
    },
    addpublickey: function() {
      this.incorrectPassword = false;
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
        if (key.name.toLowerCase() === this.keyname.toLowerCase() || key.key === this.publicKey) {
          this.keyalreadysaved = true;
          return;
        }
      }
      config.keys.push({name: this.keyname, key: this.publicKey});
      this.$store.dispatch("setKeys", config.keys);
      this.existingKeys = this.$store.state.keys;
      fs.writeFileSync(filePath, sjcl.encrypt(this.walletpassword, JSON.stringify(config)), 'utf-8');
      this.walletpassword = "";
      this.existingKeys = config.keys;
      this.showAddKey = false;
    },
    generateKey: function() {
      this.$router.push({ path: "keepyourkeyssafe" });
    },
    deleteKey(key) {
      this.keyfordelete = key;
      this.showdeletekeypassword = true;
    },
    cancelDeleteKey() {
      this.keyfordelete = "";
      this.deletekeypassword = "";
      this.showdeletekeypassword = false;
    },
    removeKey() {
      this.incorrectdeletekeypassword = false;
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      const databack = fs.readFileSync(filePath, 'utf-8');
      let config = {};
      try {
        config = JSON.parse(sjcl.decrypt(this.deletekeypassword, databack));
      } catch (error) {
        this.incorrectdeletekeypassword = true
        return;
      }
      let keyIndex;
      let newKeysArray = [];
      for (let i = 0; i < config.keys.length; i++) {
        if (config.keys[i].name !== this.keyfordelete) {
          newKeysArray.push({name: config.keys[i].name, key: config.keys[i].key});
        }
      }
      config.keys = newKeysArray;
      fs.writeFileSync(filePath, sjcl.encrypt(this.deletekeypassword, JSON.stringify(config)), 'utf-8');
      this.existingKeys = newKeysArray;
      this.keyfordelete = "";
      this.deletekeypassword = "";
      this.showdeletekeypassword = false;
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
  height: 50vh;
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
