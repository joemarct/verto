<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm">
      <div class="field">
        <div class="control p-md">
          <div class="container has-text-white p-md">
            <div class="whitelist-header has-text-centered">
              {{ $t('NotWhitelisted.header') }}
            </div>
            <br>
            <p>
              {{ $t('NotWhitelisted.first_p') }}
              <ul>

                <li>
                  <div class="whitelist-subheader has-text-centered">
                    <router-link to="/whitelist" class="two">
                      {{ $t('NotWhitelisted.link_kyc') }}
                    </router-link>
                  </div>
                  <br>
                  <div class="has-text-centered">
                    {{ $t('NotWhitelisted.first_p_second_point') }}
                  </div>
                  
                </li>
                <li>
                  
                <div class="whitelist-subheader has-text-centered">
                  <router-link to="/associatevertotoblocktopus" class="two">
                    {{ $t('NotWhitelisted.link_associate') }}
                  </router-link>
                  
                </div>
                <br>
                  {{ $t('NotWhitelisted.first_p_first_point') }}
                </li>
              </ul>
            </p>
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
a.two:visited {color:#0000ff;}
a.two:hover {font-size:150%;}
</style>
