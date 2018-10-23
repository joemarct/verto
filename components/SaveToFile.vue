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

        <router-link to="choosePassword">
          <div class="has-text-dark level-right m-l-sm m-r-lg m-t-xxl">
            <a :disabled="isEnabled" class="button m-t-md is-size-5 green is-pulled-right">
              <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">Next</p>
            </a>
          </div>
        </router-link>
      <!-- <div class="container font-gibson p-l-sm p-r-sm">
        <p class="is-size-4 font-gibson-semibold">
          File Storage
        </p>
        <p class="m-t-sm has-text-weight-bold">
          The process is as follows:
        </p>
        <br>
        <p class="m-l-md">
          <ol>
            <li>
              The application will turn off wifi and bluetooth.
            </li>
            <li>
              You will choose a directory, preferably on a usb or other offline storage mechanic.
            </li>
            <li>
              Prompted for password and confirmation password
            </li>
            <li>
              Submit
            </li>
          </ol>
        </p>
        <router-link to="saveToFile">
          <a class="button m-t-md is-size-5 aqua is-pulled-right green m-t-xxl">
            <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7">Next</p>
          </a>
        </router-link>
      </div> -->
      </div>
    </div>
  </section>
</template>


<script>
import sjcl from "sjcl";
export default {
  data() {
    return {
      isEnabled: true,
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
        this.isEnabled = false;
      } else {
        this.isEnabled = true;
      }
    },
    encrypt() {
      let fs = require("fs");
      let encr = sjcl.encrypt("password", "EOS123");
      console.log(sjcl.decrypt("password", encr));
      fs.writeFile("key.txt", encr, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("saved");
      });
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
}
.hero-body.save-file-storage .button.green p {
  color: #ffffff !important;
}
.b-checkbox {
  margin-top: 0.6rem;
}
</style>
