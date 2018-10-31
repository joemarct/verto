<template>
  <section>
    <div class="hero-body save-file-storage p-md">
      <div class="container font-gibson m-t-lg">
        <p class="is-size-4 font-gibson-semibold">
          File Storage
        </p>
        <p class="is-size-6 font-gibson has-text-weight-bold m-t-sm">
          Choosing a password
        </p>
        <br>
        <p class="m-t-lg">
          Choose a password long in length. A lyric from a song, or a line from a movie. Make it person. In short, the longer the password the better.
        </p>
        <br>
        <p>
          GIVE MORE INFORMATION ON CREATING PASSWOORDS.
        </p>
        <br>
        <p>
          Choose all that apply
        </p>
        <br>
        <div class="p-l-sm">
          <b-checkbox v-model="checkedPass1" native-value="first">
            Generated passwords with random patterns are better.
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedPass2" native-value="second">
            The longer the password the better
          </b-checkbox>
        </div>
        <div v-if="answerincorrect">
          <p class="has-text-danger m-t-md">
            One, or both, of the answers are incorrect.
          </p>
        </div>
        <br><br>
        <router-link to="/savetofileprocess">
          <a class="button m-t-md is-size-5 is-pulled-left green m-t-xxl">
            <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7">Back</p>
          </a>
        </router-link>
        <a class="button m-t-md is-size-5 green is-pulled-right m-t-xxl" @click="choosePassword">
          <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">Next</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checkedPass1: false,
      checkedPass2: false,
      answerincorrect: false
    };
  },
  methods: {
    choosePassword() {
      if (this.checkedPass1 && !this.checkedPass2) {
        this.answerincorrect = true;
      } else {
        let command = "networksetup -setairportpower airport off";
        let exec = require("child_process").exec;
        exec(command);
        this.$router.push("/choosepassword");
      }
    }
  }
};
</script>

<style scoped>
.hero-body.save-file-storage {
  background-color: #ffffff !important;
}
.hero-body.save-file-storage .font-gibson-semibold {
  color: #454f63;
}
.hero-body.save-file-storage .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.hero-body.save-file-storage .button.green {
  background-color: #00a6a6 !important;
  border-radius: 0.5rem;
  border: solid #00a6a6 1pt !important;
}
.hero-body.save-file-storage .button.green p {
  color: #ffffff !important;
}
.b-checkbox {
  margin-top: 0.6rem;
}
</style>
