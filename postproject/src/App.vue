<template>
  <div>
  <postBox></postBox>
    <postList></postList>
    <router-view></router-view>
  </div>
</template>

<script>
import postBox from './components/postBox.vue';
import postList from './components/postList.vue';
export default {
  name: 'app',
  components: {
    postBox,
    postList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
