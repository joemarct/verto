<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm">
      <div class="field">
        <div class="control p-md">
          <div class="container has-text-white p-md">
            <div class="whitelist-header has-text-centered">
              {{ $t('NotWhitelisted.get_ready') }}
            </div>
            <div class="has-text-centered">
              We are introducting the process of allowing investors the opportunity to get VTX directly through Verto.
            </div>
            <div class="has-text-centered">
              In order for investors to get VTX, they will need to first be KYC'd through a third party.
            </div>
            <div class="has-text-centered">
              Once the investor has been KYC'd, they will need to be whitelisted.
            </div>
            <div class="has-text-centered">
              Currently the whitelist process is manual and is done a case by case basis for now.
            </div>
            <div class="has-text-centered">
              This is done in order to throttle the system and ensure its integrity.
            </div>
            <div class="has-text-centered">
              Once this process is mature, we will begin to automate allowing more diversity in our investor pool.
            </div>
            <br>
            <div class="is-paddingless wallet-address has-background-darkgreen has-text-centered">
              <div class="whitelist-header has-text-centered">
                {{ $t('NotWhitelisted.kyc') }}
              </div>

              <div class="is-outlined has-text-centered">
                {{ $t('NotWhitelisted.kyc_1') }}
              </div>
              <br>
              <div class="has-text-centered">
                <router-link  to="/whitelist" class="button is-primary">
                  {{ $t('NotWhitelisted.link_kyc') }}
                </router-link>
              </div>
              <br>
            </div>
            <br>
            <div class="is-paddingless wallet-address has-background-darkgreen">
                
              <div class="whitelist-header is-paddingless has-text-centered">
                {{ $t('NotWhitelisted.link_associate') }}
              </div>
              <div class="has-text-centered is-paddingless">
                {{ $t('NotWhitelisted.second_p') }}
              </div>
              <br>
              <div class="has-text-centered is-paddingless">
                <router-link  to="/associatevertotoblocktopus" class="button is-primary">
                  {{ $t('NotWhitelisted.link_associate') }}
                </router-link>
              </div>
              <br>
            </div>

            <br>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  created: function() {
  }
};
</script>

<style scoped>
.button {
  border-radius: 0.6rem;
  width: 9rem;
}
input {
  border-radius: 0.7rem;
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
.whitelist-header {
  color: #f4f4f4;
  font-size: 30pt;
}
.whitelist-subheader {
  color: #f4f4f4;
  font-size: 17pt;
}
.has-blur-background {
  background-image: url(~@/assets/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
a.two:link {color:#00DEB1;}
a.two:visited {color:#00DEB1;;}
</style>
