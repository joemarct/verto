<template>
  <div class="hero is-fullheight has-blur-background">
    <div class="hero-head p-t-sm">

      <div class="usu-header has-text-centered">
        Create User Account
      </div>
      <br>
      <br>
      <div class="columns has-text-white">
        <div class="column is-3  is-paddingless">&nbsp;</div>
        <div class="column is-6 has-background-darkgreen has-text-centered">
          <br>
          <input v-model="username" class="input is-medium m-t-md" type="text" placeholder="Username">
          <hr style="height:1px; border:none; color:#f4f4f4; background-color:#f4f4f4;">
          <input v-model="userPassword" :class="{ 'is-danger' : notMatchingPass }" class="input is-medium m-t-md" type="password" :placeholder="$t('ChoosePassword.choose')">
          <input v-model="checkPassword" :class="{ 'is-danger' : notMatchingPass }" class="input m-t-md is-medium" type="password" :placeholder="$t('ChoosePassword.confirm')">
          <div v-if="notMatchingPass">
            <p class="has-text-danger m-t-md">
              {{ $t('CreateVertoPassword.mustmatch') }}
            </p>
          </div>
          <div v-if="fillAllFields">
            <p class="has-text-danger m-t-md">
              {{ $t('CreateVertoPassword.fillall') }}
            </p>
          </div>
          <div v-if="usernameIsTaken">
            <p class="has-text-danger m-t-md">
              {{ $t('CreateVertoPassword.username_exists') }}
            </p>
          </div>
          <a @click="checkNewUser()" class="button m-t-md is-primary is-centered has-text-white">
            <p class="is-size-6">
              Go
            </p>
          </a>
        </div>
      </div>
      <!-- <div class="m-t-lg p-l-lg p-r-lg has-text-white">
        <p class="has-text-grey-light is-size-6">
          Coming soon (in development)
        </p>
        <router-link :to="{ name: 'main', params: {key: $route.params.key} }">
          <a class="button is-primary m-t-md is-fullwidth m-t-xl is-size-5">
            <p class="p-l-md p-r-md">Next</p>
          </a>
        </router-link>
      </div> -->

    </div>
  </div>
</template>

<script>
import sjcl from "sjcl";
import axios from 'axios';

export default {
  data() {
    return {
      username: "",
      userPassword: "",
      checkPassword: "",
      notMatchingPass: false,
      fillAllFields: false,
      usernameIsTaken: false
    };
  },
  mounted() {
  },
  methods: {
    async checkNewUser() {
      // console.log(sjcl.encrypt(this.userPassword, JSON.stringify({config: {keys: []}})));
      this.fillAllFields = false;
      this.notMatchingPass = false;
      if (this.username === "" || this.userPassword === "" || this.checkPassword === "") {
        this.fillAllFields = true;
        return;
      }
      if (this.userPassword !== this.checkPassword) {
        this.notMatchingPass = true;
        return;
      }
      let hashResult = await axios.post("http://localhost:8040/ipfs-store/query/search?index=VertoWallets",
        {
          query: [
            {
              name: "title",
              operation: "contains",
              value: this.username
            }
          ]
        }
      );
      const res = await hashResult;
      console.log(res)
      if (res.data.content.length > 0) {
        this.usernameIsTaken = true;
        return;
      }
      // http://localhost:8040/ipfs-store/json/store_index
      const now = Date.now();
      const payload = {
        payload: {
          created: now,
          wallets: sjcl.encrypt(this.userPassword, JSON.stringify({keys: []}))
        },
        index: "VertoWallets",
        content_type: "application/json",
        index_fields: [

          {
            "name": "type",
            "value": "json"
          },
          {
            "name": "title",
            "value": this.username
          },
          {
            name: "created",
            value: now
          }
        ]
      }
      let saveResults = await axios.post("http://localhost:8040/ipfs-store/query/search?index=VertoWallets",
        payload
      );
      console.log(saveResults)
    }
  }
};
</script>

<style>
.usu-header {
  color: #f4f4f4;
  font-size: 30pt;
}
.button {
  border-radius: 0.6rem;
  width: 9rem;
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
