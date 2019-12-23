<template lang="pug">
  dialog#modal-server-config
    p Server config
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'ModalServerConfig',
  methods: {
    show: () => {
      const serverDialog = this.getElementById('modal-server-config');
      if (serverDialog) {
        serverDialog.showModal();
      }
    },
  },
});
</script>
