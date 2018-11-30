<template>
  <nav class="navbar is-light">
    <div class="navbar-brand">
      <div class="navbar-item" href="/">
        Vue multi layouts
      </div>

      <a class="navbar-burger" @click="open = !open">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{'is-active': open}">
      <div class="navbar-start">
      </div>

      <div class="navbar-end">
        <div class="navbar-item">

        <div class="navbar-item">
          <div class="locale-changer">
            {{ $t('SettingsView.language') }}:
            <select v-model="$i18n.locale">
              <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
            </select>
          </div>
        </div>
          <router-link class="button is-primary" :to="{name: 'walletmanager'}" @click.native="open = false">
            {{ $t('SettingsView.manager') }}
          </router-link>
        </div>
        <div class="navbar-item">
          <a class="button is-info" href="https://foreignrap.com/" @click="open = false">
            Foreignrap
          </a>
        </div>
        <div class="navbar-item">
          <a class="button is-info" href="http://mustsee.earth" @click="open = false">
            Like traveling ? Click
          </a>
        </div>
      </div>
    </div>
  </nav>
</template> 

<script>
export default {
  name: 'locale-changer',
  data() {
    return {
      open: false,
      langs: ['en', 'fr']
    };
  }
};
</script>

<style lang="scss">
.navbar {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}
</style>