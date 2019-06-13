<template>
  <div class="main">
    <Header id="Header" class="panel"></Header>
    <LeftMenu id="LeftMenu" class="panel"></LeftMenu>
    <Panel id="Panel" class="panel"></Panel>
    <Footer id="Footer" class="panel"></Footer>
  </div>
</template>


<script lang='ts'>
import Vue from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import LeftMenu from "./components/LeftMenu.vue";
import Panel from "./components/Panel.vue";

export default {
  name: "App",
  components: { Header, Footer, LeftMenu, Panel },
  computed: {
    getCount() {
      return this.$store.state.count;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
.main {
  display: grid;
  grid-template:
    "Header Header"
    "LeftMenu Panel" 1fr
    "Footer Footer" /
    250px 1fr;
  min-height: 100vh;
  background-color: #585858;
  font-family: 'Roboto', sans-serif;
}
.panel {
  color: #ffffff;
  border: 1px solid #c3c3c3;
  background-color: #474747;
  padding: 10px;
}
#Header {
  grid-area: Header;
}
#LeftMenu {
  grid-area: LeftMenu;
}
#Panel {
  grid-area: Panel;
}
#Footer {
  grid-area: Footer;
}
</style>
