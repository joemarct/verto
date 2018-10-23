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
          <b-checkbox v-model="checkedPass" native-value="first" @change.native="enableButton">
            Generated passwords are better
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedPass" native-value="second" @change.native="enableButton">
            The longer the password the better
          </b-checkbox>
        </div>
        <br><br>
        <a :disabled="isDisabled" class="button m-t-md is-size-5 green is-pulled-right m-t-xxl" @click="choosePassword">
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
      isDisabled: true,
      checkedPass: [],
      checkedAnswers: 0
    };
  },
  methods: {
    enableButton(event) {
      if (event.target.checked) {
        this.checkedAnswers++;
      } else {
        this.checkedAnswers--;
      }
      if (this.checkedAnswers === 2) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    choosePassword() {
      if (!this.isDisabled) {
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
