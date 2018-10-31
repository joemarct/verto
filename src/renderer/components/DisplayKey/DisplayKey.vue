<template>
  <section>
    <div class="hero-head p-md save-your-keys">
      <p class="is-size-4 font-gibson-semibold">
        Display Key
      </p>
    </div>
    <div class="hero-body save-your-keys">
      <div class="container font-gibson">
        <b-checkbox native-value="write" @change.native="checkClicked">
          I understand that I will never see my private key again
        </b-checkbox>

        <div class="column display-keys font-gibson has-text-white p-md m-t-md">
          <div class="generated-keys p-md">
            <a @click="isKeyModalActive = true">
              <div class="wallet-address">
                <span class="is-size-6 has-text-aqua p-l-sm">Private: </span>
                <span class="is-size-7 has-text-white p-l-sm"> {{ privateKey }} </span>
              </div>
              <div class="wallet-address p-t-sm">
                <span class="is-size-6 has-text-aqua p-l-sm">Public: </span>
                <span class="is-size-7 has-text-white p-l-sm"> {{ publicKey }} </span>
              </div>
            </a>
          </div>
        </div>
        <div class="m-t-md">
          <p>
            Give Your Key A Name
          </p>
          <input v-model="keyname" class="input m-b-sm" type="text" placeholder="Name">
          <div v-if="keyalreadyused">
            <p class="has-text-danger m-t-md">
              The name or the key has already been used.
            </p>
          </div>
          <div v-if="keynameempty">
            <p class="has-text-danger m-t-md">
              You must provide a name for your key.
            </p>
          </div>
          <p class="is-size-6">
            Type the following text in the textfield below:
          </p>
          <br>
          <p>
            {{ requiredText }}
          </p>
          <div class="field m-t-sm">
            <textarea v-model="textInput" class="textarea" placeholder="Type the text from above in this field" @keyup="checkText"/>
          </div>
          <div class="has-text-dark is-pulled-right">
            <a :disabled="isDisabled" class="button m-t-md is-size-5 green is-pulled-right" @click="goToCongratsScreen">
              <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">Next</p>
            </a>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isKeyModalActive">
      <div class="card">
        <div class="card-content">
          <p>
            Write down your keys.
          </p>
          <br>
          <p>
            Private key: {{ privateKey }}
          </p>
          <br>
          <p>
            Public key: {{ publicKey }}
          </p>
        </div>
      </div>
    </b-modal>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: true,
      checkedAnswers: 0,
      isKeyModalActive: false,
      privateKey: "",
      publicKey: "",
      requiredText: "Key copied",
      textInput: "",
      clicked: false,
      keynameempty: false,
      keyalreadyused: false,
      keyname: ""
    };
  },
  mounted() {
    this.generateKeys();
  },
  methods: {
    generateKeys() {
      const ecc = require("eosjs-ecc");
      ecc.randomKey().then(privateKey => {
        this.privateKey = privateKey; // wif
        this.publicKey = ecc.privateToPublic(privateKey); // EOSkey...
        this.$store.commit("save", this.publicKey);
      });
    },
    checkText() {
      if (this.textInput === this.requiredText && this.clicked) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    checkClicked() {
      this.clicked = !this.clicked;
      if (this.textInput === this.requiredText && this.clicked) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    goToCongratsScreen() {
      if (this.isDisabled) {
        return;
      }
      this.keynameempty = false;
      this.keyalreadyused = false;
      if (this.keyname === "") {
        this.keynameempty = true;
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
        if (key.name.toLowerCase() === this.keyname.toLowerCase()) {
          this.keyalreadyused = true;
          return;
        }
      }
      config.keys.push({name: this.keyname, key: this.publicKey});
      fs.writeFile(filePath, JSON.stringify(config), 'utf-8', () => {
        this.$router.push("congratsscreen");
      });
    }
  }
};
</script>

<style scoped>
.display-keys {
  background-color: #162929;
  border-radius: 0.6rem;
  padding: 1rem !important;
}
.generated-keys {
  background-color: #1a4a48;
  border-radius: 0.6rem;
  border: solid #3acce1 1.2pt;
  overflow-wrap: break-word;
}
.hero-body.save-your-keys {
  background-color: #f7f7fa !important;
  padding-top: 0.3rem !important;
}
.hero-head.save-your-keys {
  background-color: #f7f7fa !important;
}
.save-your-keys .font-gibson-semibold {
  color: #454f63;
}
.hero-body.save-your-keys p.font-gibson-semibold.second {
  color: #ffffff;
}
.hero-body.save-your-keys .button.green {
  background-color: #00a6a6 !important;
}
.hero-body.save-your-keys .button.aqua {
  background-color: #2cfee6 !important;
}
.hero-body.save-your-keys .font-gibson {
  color: #78849e;
  font-size: 10.5pt;
}
.hero-body.save-your-keys .button {
  border-radius: 0.7rem;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.level-left .button {
  width: 10rem;
  height: 3rem;
}
.level-right .button {
  width: 10rem;
  height: 3rem;
}
.container {
  width: 10rem;
}
</style>
