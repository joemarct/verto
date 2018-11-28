<template>
  <section>
    <div class="hero-head safe-keys p-md">
      <div class="has-text-centered">
        <img src="~@/assets/img/saveKeys.png">
      </div>
    </div>
    <div class="hero-body safe-keys">
      <div class="container font-gibson">
        <p class="is-size-4 font-gibson-semibold">
          {{ $t('KeepYourKeysSafe.keepsafe') }}
        </p>
        <p class="m-t-sm">
          {{ $t('KeepYourKeysSafe.before') }}
        </p>
        <br>
        <p>
          {{ $t('KeepYourKeysSafe.choices') }}
        </p>
        <ol class="m-l-md">
          <li>
            {{ $t('KeepYourKeysSafe.first') }}
          </li>
          <li>
            {{ $t('KeepYourKeysSafe.second') }}
          </li>
        </ol>
        <br>
        <br>
        <router-link to="/saveyourkeys">
          <a class="is-primary button m-t-md is-size-5 is-pulled-right">
            <p class="p-l-md p-r-md is-size-6">{{ $t('KeepYourKeysSafe.next') }}</p>
          </a>
        </router-link>
        <router-link to="/walletmanager">
          <a class="is-primary button m-t-md is-size-5 is-pulled-left">
            <p class="p-l-md p-r-md is-size-6">{{ $t('KeepYourKeysSafe.back') }}</p>
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
.hero-body.safe-keys {
  background-color: #ffffff !important;
  padding-top: 0 !important;
}
.hero-head.safe-keys {
  background-color: #ffffff !important;
}
.hero-body.safe-keys .font-gibson-semibold {
  color: #454f63;
}
.hero-body.safe-keys .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.hero-body.safe-keys .button {
  border-radius: 0.7rem;
}
iframe {
  width: 100%;
}
</style>
