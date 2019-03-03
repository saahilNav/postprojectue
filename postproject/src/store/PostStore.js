import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const store = new Vuex.Store({
   state: {
      // comentValue:null,
      postValue: '',
      flgShowTextArea: false,
      flgShowCloseBtn: false,
      flgObjectEdited: false,
      editObj: null,
      postList: [],
   },
   actions: {
      addPost({ commit, state }, postData) {
         let id = state.postList.length + 1;
         postData.id = id;
         let like = postData.like + 1;
         postData.like = like;
         commit('SetaddPost', postData)
      },
      DeletPostItem({ commit }, data) {
         commit('splicPostItem', data)
      },
      EditPostItemData({ commit }, data) {
         //  this.$emit('EditPostItemData',data)
         commit('setEditPostItem', data)
      },
      commentData({ commit }) {
                  commit('setCommentdata')
      },

      updateTextareaValue({ commit }, value) {
         // alert('setTextAreaValue' + value);
         commit('setTextAreaValue', value)
      },

      updateFlgShowTextarea({ commit }, value) {
         // alert('updateFlgShowTextarea' + value);
         commit('setFlgShowTextarea', value)
      },
      updateFlgShowCloseBtn({ commit }, value) {
         // alert('updateFlgShowCloseBtn' + value);
         commit('setFlgShowCloseBtn', value)
      },
      editObjMethod({ commit }, value) {
         commit('SeteditObjMethod', value)
      },
      updatMethod({ commit}, value) {  

          commit('setUpdateMethod', value)
      },
      flgObjectEdited({ commit }, value) {
         commit('SetflgObjectEdited', value)
      }
   },
   mutations: {
      SetaddPost(state, postData) {
         state.postList.push(postData);
      },
      splicPostItem(state, data) {
         state.postList.splice(state.postList.indexOf(data), 1);
      },
      setEditPostItem(state, data) {
         state.editObj = data;
      },

      setCommentdata(state, data) {
         state.postList.push(data);

      },

      setTextAreaValue(state, value) {
         state.postValue = value;
      },
      setFlgShowTextarea(state, value) {
         state.flgShowTextArea = value;
      },
      setFlgShowCloseBtn(state, value) {
         state.flgShowCloseBtn = value;
      },
      // setUpdateMethod(state, value) {
      // //   for (let index = 0; index < state.postList.length; index++) {
      // //       let post = state.postList[index];
      // //       if (post.id === value.id) {
      // //          state.postList[index] = value;
          
      // //       state.postList[index].inputValue;

      // //          // state.postList=value
      // //       }
      // //       // alert(state.postList[index].inputValue);
      // //     }
      // },
      SeteditObjMethod(state, value) {
         state.editObj = value;

      },
      SetflgObjectEdited(state, value) {
         state.flgObjectEdited = value;
      }
   },

   getters: {
      getAddPost(state) {
         return state.postList;
      },
      getEditPostItem(state) {
         return state.editObj;
      },
      getisSHowPost(state) {
         state.isSHowPost = true;
      },
      getComentReturn(state) {
         return state.postList;
      },

      getPostValue(state) {
         return state.postValue;
      },
      getEnablePTextAreaFlag(state) {
         return state.flgShowTextArea;
      },
      geFlgCloseBtn(state) {

         return state.flgShowCloseBtn;
      },
      getUpdateMethod(state) {
         return state.editObj
      },
      getEditobjMethod(state) {
         return state.editObj;
      },
      getflgObjectEdited(state) {
         return state.flgObjectEdited;
      }
   }

})
export default store;
