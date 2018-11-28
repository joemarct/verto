<template>
  <section>
    <div class="hero-body save-your-keys">
      <div class="container font-gibson">
        <p class="is-size-4 font-gibson-semibold">
          {{ $t('KeepYourKeysSafe.keepsafe') }}
        </p>
        <p class="m-t-sm">
          {{ $t('SaveYourKeys.strategy') }}
        </p>
        <br>
        <p v-html="$t('SaveYourKeys.physical')"></p>
        <br>
        <p v-html="$t('SaveYourKeys.legacy')"></p>
        <br>
        <div class="p-l-sm">
          <b-checkbox v-model="checkedQuiz" native-value="first" @change.native="enableButtons">
            {{ $t('SaveYourKeys.agree') }}
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="second" @change.native="enableButtons">
            {{ $t('SaveYourKeys.responsible') }}
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="third" @change.native="enableButtons">
            {{ $t('SaveYourKeys.access') }}
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="fourth" @change.native="enableButtons">
            {{ $t('SaveYourKeys.wifi') }}
          </b-checkbox>
        </div>
        <div class="level is-mobile m-t-md">
          <div class="has-text-dark level-left">
            <a :disabled="buttonsAreDisabled" class="button m-t-md is-size-5 aqua" @click="disableWiFi('/choosepassword')">
              <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7">{{ $t('SaveYourKeys.tofile') }}</p>
            </a>
          </div>
          <div class="has-text-dark level-right m-l-sm m-r-lg">
            <a :disabled="buttonsAreDisabled" class="button m-t-md is-size-5 green" @click="disableWiFi('/displaykey')">
              <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">{{ $t('SaveYourKeys.writedown') }}</p>
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
    disableWiFi(url) {
      if (!this.buttonsAreDisabled) {
        let command = "networksetup -setairportpower airport off";
        let exec = require("child_process").exec;
        exec(command);
        this.$router.push(url);
      }
    },
    enableButtons(event) {
      if (event.target.checked) {
        this.quizOptions++;
      } else {
        this.quizOptions--;
      }
      if (this.quizOptions === 4) {
        this.buttonsAreDisabled = false;
      } else {
        this.buttonsAreDisabled = true;
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
