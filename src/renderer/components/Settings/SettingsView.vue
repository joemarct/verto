<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="p-t-xl">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/main">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~@/assets/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <p class="p-t-lg has-text-aqua is-size-4">
        Settings
      </p>
      <div class="p-t-md settings-list">
        <!-- <div class="is-size-5 has-text-white is-pulled-left">
          <font-awesome-icon icon="sync-alt" class="fa-xs"/>
        </div> -->
        <!-- <span class="p-l-md has-text-white is-size-5">
          <router-link to="/checkforupdates">
            Check for Updates
          </router-link>
        </span> -->
        <br>
        <span class="p-l-lg has-text-white is-size-5">
          <router-link to="/whitelist">
            Whitelist
          </router-link>
        </span>
        <br>
        <span class="p-l-lg has-text-white is-size-5">
          <router-link to="/getvtx">
            Get VTX
          </router-link>
        </span>
        <br>
        <span class="p-l-lg has-text-white is-size-5">
          <router-link to="/selectkey">
            Key Manager
          </router-link>
        </span>
        <br>
        <span class="p-l-lg has-text-white is-size-5">
          <router-link to="/changepassword">
            Change Password
          </router-link>
        </span>
        <div @click="logout">
          <span class="p-l-lg has-text-white is-size-5">
            Logout
          </span>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div class="has-text-grey-light is-size-7 p-b-md p-t-md p-l-md">
        {{ appName }}: {{ appVersion }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appVersion: this.$appVersion,
      appName: this.$appName
    };
  },
  mounted() {
  },
  methods: {
    logout: function() {
      this.$store.dispatch("login", false);
      this.$store.dispatch("setKeys", []);
      this.$router.push({ path: "welcome" });
    }
  }
};
</script>

<style>
.settings-list span:hover {
  color: hsl(171, 100%, 41%) !important;
  cursor: pointer;
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
