<template>
  <div id="app">
    <v-head></v-head>
    <router-view/>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <v-footer></v-footer>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import head from './components/head.vue'
import footer from './components/footer.vue'

export default {
  name: 'app',
  components: {
    //HelloWorld,
    "v-head":head,
    "v-footer":footer
  }
}
</script>

<style>
body{
  margin: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
