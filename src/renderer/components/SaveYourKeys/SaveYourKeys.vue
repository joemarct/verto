<template>
  <section>
    <div class="hero-body save-your-keys">
      <div class="container font-gibson">
        <p class="is-size-4 font-gibson-semibold">
          Keep your keys safe
        </p>
        <p class="m-t-sm">
          Regarless of your selection above, you will need to plan a strategy for the physical storage of your private key. This storage strategy
          should include long term thinking, including:
        </p>
        <br>
        <p>
          Physical Security: Vaults of any kind that provide the protection you are seeking. Think of somewhere you know its safe from
          theft as well as the elements. In some cases, you will choose a bank or lawyer.
          In others you may prefer to bury it in your backyard. The choice is yours.
        </p>
        <br>
        <p>
          Legacy: Things happen. Life ends. You need to plan for the transference of your wallet to someone you else. In some cases that may
          be through a will, while in others it becomes a scavanger hunt. The choice is yours.
        </p>
        <br>
        <p>
          Quiz
        </p>
        <div class="p-l-sm">
          <b-checkbox v-model="checkedQuiz" native-value="first" @change.native="enableButtons">
            I agree with the Terms &amp; Conditions
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="second" @change.native="enableButtons">
            I am entirely responsible for the security managment of my private key
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="third" @change.native="enableButtons">
            I understand that Volentix and/or partners never have access to my private key
          </b-checkbox>
        </div>
        <div class="level is-mobile m-t-md">
          <div class="has-text-dark level-left">
            <a :disabled="buttonsAreDisabled" class="button m-t-md is-size-5 aqua" @click="saveToFileProcess">
              <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7">Save to file</p>
            </a>
          </div>
          <div class="has-text-dark level-right m-l-sm m-r-lg">
            <a :disabled="buttonsAreDisabled" class="button m-t-md is-size-5 green" @click="writeDownProcess">
              <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">I'll write it down</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checkedQuiz: [],
      buttonsAreDisabled: true,
      quizOptions: 0
    };
  },
  methods: {
    enableButtons(event) {
      if (event.target.checked) {
        this.quizOptions++;
      } else {
        this.quizOptions--;
      }
      if (this.quizOptions === 3) {
        this.buttonsAreDisabled = false;
      } else {
        this.buttonsAreDisabled = true;
      }
    },
    saveToFileProcess() {
      if (!this.buttonsAreDisabled) {
        this.$router.push("/savetofileprocess");
      }
    },
    writeDownProcess() {
      if (!this.buttonsAreDisabled) {
        this.$router.push("/writedownprocess");
      }
    }
  }
};
</script>

<style scoped>
.control-label:hover {
  color: #2cfee6 !important;
}
.hero-body.save-your-keys {
  background-color: #ffffff !important;
}
.hero-body.save-your-keys .font-gibson-semibold {
  color: #454f63;
}
.hero-body.save-your-keys p.font-gibson-semibold.second {
  color: #ffffff;
}
.hero-body.save-your-keys .button.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 1pt !important;
}
.hero-body.save-your-keys .button.aqua {
  background-color: #2cfee6 !important;
  border: solid #2cfee6 1pt !important;
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
