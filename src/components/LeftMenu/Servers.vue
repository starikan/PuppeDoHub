<template>
  <div>
    Servers
    <li v-for="(server, name) in servers" :key="name">{{name}}</li>
    <hr>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers('ppd');
export default Vue.extend({
  name: "Servers",
  computed: {
    ...mapState("ppd", ["servers"])
  }
});
</script>
