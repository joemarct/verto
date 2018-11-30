<script>
import NavBar from "@/components/layout/NavBar";
import FooterBar from "@/components/layout/FooterBar";
export default {
  components: {
    NavBar,
    FooterBar
  }
};
</script>

<template>
  <div>
    <nav-bar />

    <div class="container">
      <slot />
    </div>

    <footer-bar />
  </div>
</template>