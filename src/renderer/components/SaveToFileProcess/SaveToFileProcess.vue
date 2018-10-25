<template>
  <section>
    <div class="hero-head p-md save-to-file">
      <img src="~@/assets/img/saveKeys.png">
    </div>
    <div class="hero-body save-to-file">
      <div class="container font-gibson p-l-sm p-r-sm">
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
        <router-link to="/savetofile">
          <a class="button m-t-md is-size-5 is-pulled-right green m-t-xxl">
            <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7">Next</p>
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
.hero-body.save-to-file {
  background-color: #ffffff !important;
  padding-top: 0.3rem !important;
}
.hero-head.save-to-file {
  background-color: #ffffff !important;
}
.hero-body.save-to-file .font-gibson-semibold {
  color: #454f63;
}
.hero-body.save-to-file .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.hero-body.save-to-file .button.green {
  background-color: #00a6a6 !important;
  border-radius: 0.5rem;
  border: solid #00a6a6 1pt !important;
}
.hero-body.save-to-file .button.green p {
  color: #ffffff !important;
}
</style>
