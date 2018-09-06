<template>
  <section class="hero is-fullheight is-light is-bold" >
    <ViewTransactionDetails/>
  </section>
</template>

<script>
import ViewTransactionDetails from "~/components/ViewTransactionDetails.vue";
export default {
  components: {
    ViewTransactionDetails
  }
};
</script>
