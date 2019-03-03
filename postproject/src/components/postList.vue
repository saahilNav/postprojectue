<template>
  <div id="ListDiv" v-if="getAddPost">
    <postItem v-for="postItemObj in getAddPost" :key="postItemObj.id" :postItemObj="postItemObj"></postItem>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import postItem from "./postItem";
export default {
  name: "postList",
  components: {
    postItem
  },
   computed:mapGetters(["getAddPost"]) ,
   methods:mapActions[('addPost')]

   
};
</script>



<style>
</style>
