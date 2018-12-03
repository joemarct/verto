<script>
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import FooterBar from "@/components/layout/FooterBar";

export default {
  components: {
    NavBar,
    SideBar,
    FooterBar
  }
};
</script>

<template>
  <div>
    <nav-bar />
    
    <div class="section is-dark">
      <div class="columns">
        <div class="column is-12 ">
          <slot />
        </div>
      </div>
    </div>

    <footer-bar />
  </div>
</template>