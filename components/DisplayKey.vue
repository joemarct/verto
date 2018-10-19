<template>
  <section>
    <div class="hero-head p-md save-your-keys">
      <p class="is-size-4 font-gibson-semibold">
        Display Key
      </p>
    </div>
    <div class="hero-body save-your-keys">
      <div class="container font-gibson">
        <b-checkbox native-value="write">
          I understand that I will never see my private key again
        </b-checkbox>

        <div class="column display-keys font-gibson has-text-white p-md m-t-md">
          <div class="generated-keys p-md">
            <a @click="isKeyModalActive = true">
              <div class="wallet-address">
                <span class="is-size-7 has-text-aqua p-l-sm">Private: </span>
                <span class="size-font-wallet has-text-white p-l-sm"> {{ privateKey }} </span>
              </div>
              <div class="wallet-address p-t-sm">
                <span class="is-size-7 has-text-aqua p-l-sm">Public: </span>
                <span class="size-font-wallet has-text-white p-l-sm"> {{ publicKey }} </span>
              </div>
            </a>
          </div>
        </div>

        <div class="m-t-md">
          <p class="is-size-6">
            Type the following in the textfield below:
          </p>
          <br>
          <p>
            {{ requiredText }}
          </p>
          <div class="field m-t-sm">
            <textarea v-model="textInput" class="textarea" placeholder="Type here" @keyup="checkText"/>
          </div>
          <router-link to="congratsScreen">
            <div class="has-text-dark is-pulled-right m-t-md">
              <a :disabled="isDisabled" class="button m-t-md is-size-5 green is-pulled-right">
                <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">Next</p>
              </a>
            </div>
          </router-link>
        </div>


      </div>
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
      textInput: ""
    };
  },
  mounted() {
    this.generateKeys();
  },
  methods: {
    checkAnswers(event) {
      if (event.target.checked) {
        this.checkedAnswers++;
      } else {
        this.checkedAnswers--;
      }
      if (this.checkedAnswers === 3) {
        this.disableButton = false;
      } else {
        this.disableButton = true;
      }
    },
    generateKeys() {
      const ecc = require("eosjs-ecc");
      ecc.randomKey().then(privateKey => {
        this.privateKey = privateKey; // wif
        this.publicKey = ecc.privateToPublic(privateKey); // EOSkey...
        this.$store.commit("save", this.publicKey);
      });
    },
    checkText() {
      if (this.textInput === this.requiredText) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
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
