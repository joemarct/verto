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
              The private key is displayed.
            </li>
            <li>
              You write it down or take an analogue photo.
            </li>
            <li>
              Type in a confirmation code.
            </li>
            <li>
              Store the physical paper, polariod, roll of film, microdot, etc.
            </li>
          </ol>
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
        <router-link to="/writeyourkey">
          <a class="button m-t-md is-size-5 is-pulled-right green">
            <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7 has-text-white">Next</p>
          </a>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
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
