<template>
  <div>
    Servers
    <li v-for="(server, index) in servers" :key="index">{{ server.name }}</li>
    {{ servers }}

    <button @click="addServer()">Add Local PuppeDo server</button>
    <button @click="addServer()">Add Remote PuppeDo server</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers, mapState, mapActions } from 'vuex';
// const { mapState, mapActions } = createNamespacedHelpers('servers');
export default Vue.extend({
  name: 'Servers',
  computed: {
    ...mapState('servers', ['servers']),
  },
  methods: {
    addServer: () => {
      console.log('addServer');
    },
  },
});
</script>
