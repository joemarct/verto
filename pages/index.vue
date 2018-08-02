<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="~/assets/img/verto-dark.png" alt="A multi-currency crypto wallet with initial support for EOS &amp; VTX">
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Wallet
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Create
              </a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            100 VTX
          </div>
        </div>
      </div>
    </nav>

    <section class="container is-fullwidth">
      <textarea :placeholder="messages" class="textarea" rows="10" type="text" readonly />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: "EOS result"
    };
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.btn {
  margin: 0 8px;
}
</style>
