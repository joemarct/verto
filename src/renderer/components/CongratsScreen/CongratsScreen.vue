<template>
  <section>
    <div class="hero-body congrats p-t-md">
      <div class="container font-gibson m-t-xl has-text-centered">
        <img src="~@/assets/img/congratsScreen.png">
        <div>
          <router-link to="/main">
            <a class="button is-size-5 green">
              <p class="p-l-sm p-r-sm is-size-5 font-gibson-semibold">Continue</p>
            </a>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    let command = "networksetup -setairportpower en0 on";
    let exec = require("child_process").exec;
    exec(command);
  }
};
</script>

<style scoped>
.hero-body.congrats {
  background-color: #162929 !important;
  height: 100%;
  margin: 0 auto;
}
.hero-body.congrats .container{
  width: 60%;
  margin: 0 auto;
}
.hero-body.congrats img {
  width: 34%;
  margin: 0 auto;
}
.congrats .font-gibson-semibold {
  color: #454f63;
  font-size: 16pt;
}
.hero-body.congrats .button.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 2pt !important;
  border-radius: 0.6rem;
  margin-top: 3rem !important;
  height: 3.5rem;
  width: 30%;
}
</style>
