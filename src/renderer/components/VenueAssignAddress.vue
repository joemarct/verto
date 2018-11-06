<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="p-t-xl">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/settings">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~@/assets/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <a @click="isInstructionsActive = true">
        <font-awesome-icon icon="question-circle" class="fa-lg has-text-grey-light  is-pulled-right m-r-sm"/>
      </a> 
      <div class="field">
          <div class="control">
            <div v-if="invalidCredentials">
              <p class="has-text-danger m-t-md">
                Username and/or password invalid.
              </p>
            </div>
            <div v-if="missinginput">
              <p class="has-text-danger m-t-md">
                Username and password are required.
              </p>
            </div>
            <div v-if="nonVerifiedAccount">
              <p class="has-text-danger m-t-md">
                Account has not been verified. Must be verified in Venue.
              </p>
            </div>
            <div v-if="exceptionOccured">
              <p class="has-text-danger m-t-md">
                The system is down. Please try again later.
              </p>
            </div>
            <div v-if="nonUniqueVertoAddress">
              <p class="has-text-danger m-t-md">
                The address has already been assigned to a Venue user account.
              </p>
            </div>
            <input v-model="venueusername" :disabled="!disableSave" class="input is-medium m-t-md" type="text" placeholder="Venue Username">
            <input v-model="venuepassword" :disabled="!disableSave" class="input is-medium m-t-md" type="password" placeholder="Venue Password" required password-reveal>
            <div v-if="!disableSave">
              <br>
              <p class="has-text-white">
                Address assigned to your account.
              </p>
            </div>
          </div>
        </div>
        <div class="level is-mobile m-t-md">
          <div class="has-text-dark level-left">
            <a  @click="$router.push({ path: 'settings' })" class="button m-t-md green is-centered has-text-white">
              <p class="is-size-6">
                {{ backBtnMessage }}
              </p>
            </a>
          </div>
          <div class="has-text-dark level-right">
            <a class="button m-t-md is-size-5 green is-pulled-right" :disabled="!disableSave"  @click="assignVertoAddressToVenue">
              <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">Save</p>
            </a>
          </div>
        </div>
    </div>
    <b-modal :active.sync="isInstructionsActive">
        <div class="card">
          <div class="card-content">
            <div class="modal-header">
              <slot name="header">
                Recommended
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  * Store on an external drive, wallet, or usb key.
                </li>
              </ul>
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                Once Completed
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  * Look for a warm, safe, secure, dry place such as a bank safety deposit box.
                </li>
                <li>
                  * Add provisions to your will on who and how the transfer of your wallet will be conducted.
                </li>
              </ul>
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                Do Not
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  * Store it on your computers local drive.
                </li>
                <li>
                  * Share with anyone.
                </li>
                <li>
                  * Email it.
                </li>
                <li>
                  * Store on the cloud.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
  </div> 
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      appVersion: this.$appVersion,
      appName: this.$appName,
      blocktopusUrl: 'https://volentix.blocktopus.io/token_buyers/sign_up?verto_public_address=' + this.$store.state.userKey,
      isInstructionsActive: false,
      invalidCredentials: false,
      missinginput: false,
      exceptionOccured: false,
      nonVerifiedAccount: false,
      nonUniqueVertoAddress: false,
      venueusername: "",
      venuepassword: "",
      disableSave: true,
      backBtnMessage: "Cancel"
    };
  },
  mounted() {
  },
  methods: {
    checkBlocktopus: function() {
      console.log(this.blocktopusUrl)
      console.log(__dirname)
    },
    openTelegram: function() {
      var open = require("open");
      open("http://t.me/volentix");
    },
    logout: function() {
      this.$store.dispatch("login", false);
      this.$store.dispatch("setKeys", []);
      this.$router.push({ path: "welcome" });
    },
    async assignVertoAddressToVenue() {
      if (!this.disableSave) {
        return;
      }
      this.missinginput = false;
      this.invalidCredentials = false;
      this.exceptionOccured = false;
      this.nonVerifiedAccount = false;
      this.nonUniqueVertoAddress = false;
      if (this.venueusername === "" || this.venuepassword === "") {
        this.missinginput = true;
      }
      try {
        let callvenue = await axios.post(
          "https://venue-uat.volentix.io/api/assign-verto-address",
          {
            username: this.venueusername,
            password: this.venuepassword,
            verto_address: this.$store.state.userKey
          }
        );
        this.disableSave = false;
        this.backBtnMessage = "Back";
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error_code) {
          const errorCode = error.response.data.error_code;
          if (errorCode === "wrong_credentials") {
            this.invalidCredentials = true;
          } else if (errorCode === "email_verification_required") {
            this.nonVerifiedAccount = true;
          } else if (errorCode === "verto_address_not_unique") {
            this.nonUniqueVertoAddress = true;
          }
        } else {
          this.exceptionOccured = true;
        }
      }
    }
  }
};
</script>
<style>
.settings-list span:hover {
  color: hsl(171, 100%, 41%) !important;
  cursor: pointer;
}
.modal-header {
  margin-top: 0;
  color: #42b983;
}
.is-size-custom-header {
  font-size: 1.7rem;
}
.logo {
  height: 3.3rem;
  border-top: solid 0.2rem rgba(55, 202, 189, 0.3);
}
.is-size-vtx-amount {
  font-size: 2.7rem;
}
.copy-button {
  width: 100%;
}
.has-blur-background {
  background-image: url(~@/assets/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.has-text-aqua {
  color: #2cfee6;
}
.size-smaller {
  font-size: 0.75rem;
}
.is-vcentered {
  align-items: center;
}
.line-height-md {
  line-height: 1rem;
}
.list-item {
  border-bottom: solid 1px rgba(55, 202, 189, 0.3);
  width: 100vw;
}
.hero-foot {
  border-top: solid 1px rgba(55, 202, 189, 0.3);
}
</style>
