<template>
  <section>
    <div class="hero-head p-md save-your-keys">
      <img src="~@/assets/img/saveKeys.png">
    </div>
    <div class="hero-body save-your-keys">
      <div class="container font-gibson">
        <p class="is-size-4 font-gibson-semibold">
          Keep your keys safe
        </p>
        <br>
        <p class="has-text-weight-bold">
          Not Recommended
        </p>
        <p class="m-l-md">
          <ol>
            <li>
              Take a photo/video with your cellphone or digital camera.
            </li>
            <li>
              Take a screenshot.
            </li>
          </ol>
        </p>
        <div class="p-md">
          <b-checkbox v-model="checkedQuiz" native-value="first" @change.native="checkAnswers">
            I understand WIFI will be disabled temporarily during the generation of keys
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="second" @change.native="checkAnswers">
            I am entirely responsible for the security managment of my private key
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="third" @change.native="checkAnswers">
            I understand that Volentix and/or partners never have access to my private key
          </b-checkbox>
        </div>
        <router-link to="/writedownprocess">
          <a class="button m-t-md is-size-5 is-pulled-left green">
            <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7 has-text-white">Back</p>
          </a>
        </router-link>
        <a :disabled="disableButton" @click="disableWiFi" class="button m-t-md is-size-5 is-pulled-right green">
          <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7 has-text-white">Next</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checkedQuiz: [],
      disableButton: true,
      checkedAnswers: 0
    };
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
    disableWiFi() {
      if (!this.disableButton) {
        let command = "networksetup -setairportpower airport off";
        let exec = require("child_process").exec;
        exec(command);
        this.$router.push("/displaykey");
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
  padding-top: 0.3rem !important;
}
.hero-head.save-your-keys {
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
