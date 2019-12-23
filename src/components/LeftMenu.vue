<template>
  <div>
    <Servers></Servers>
    <Configs></Configs>
    <Instances></Instances>
    <Tests></Tests>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Configs from "./LeftMenu/Configs.vue";
import Instances from "./LeftMenu/Instances.vue";
import Tests from "./LeftMenu/Tests.vue";
import Servers from "./LeftMenu/Servers.vue";

export default Vue.extend({
  name: "LeftMenu",
  components: { Configs, Instances, Tests, Servers }
});
</script>