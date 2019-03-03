<template>
  <div>
    <div>
      <!-- header div -->
      <div id="headeDiv">
        <div style="float:left">
          <p id="greetUserP">Hey Temporary ! Welcome to your playground!</p>
        </div>
        <div class="cloBtn" v-if="isShowBtn">
          <img @click="hideTextArea" src="https://img.icons8.com/material/24/000000/multiply.png">
        </div>
      </div>
      <input
        id="searchInput"
        v-if="!isHidden"
        type="text"
        placeholder="Post your thought,ideas and learning"
        @click="showTextArea()"
      >
      <!-- textarea div -->
      <div id="postContainer" v-if="isHidden">
        <div class="divtextArea">
          <div class="divText">
            <p class="p1">T</p>
            <textarea id="text1" placeholder="Start typing here" v-model="textAreaVal" autofocus></textarea>
          </div>
          <div class="footerDiv" v-if="!flgEdited">
            <button class="postBtn" @click="addPost">Post</button>
          </div>
          <div class="footerDiv" v-if="flgEdited">
            <button class="postBtn" @click="updatePost">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "postBox",
  computed: {
    textAreaVal: {
      get: function() {
        return this.$store.state.postValue;
      },
      set: function(value) {
        return this.$store.dispatch("updateTextareaValue", value);
      }
    },
    isHidden: {
      get: function() {
        return this.$store.state.flgShowTextArea;
      },
      set: function(value) {
        return this.$store.dispatch("updateFlgShowTextarea", value);
      }
    },
    isShowBtn: {
      get: function() {
        return this.$store.state.flgShowCloseBtn;
      },
      set: function(value) {
        return this.$store.dispatch("updateFlgShowCloseBtn", value);
      }
    },
    editedObj: {
      get: function() {
        return this.$store.state.editObj;
      },
      set: function(value) {
        return this.$store.dispatch("editObjMethod", value);
      }
    },
    flgEdited: {
      get: function() {
        return this.$store.state.flgObjectEdited;
      },
      set: function(value) {
        return this.$store.dispatch("flgObjectEdited", value);
      }
    }
  },
  methods: {
    addPost() {
      if (this.textAreaVal == null || this.textAreaVal.trim() == "") {
        this.textAreaVal = "";
        this.$toast.top("Please enter valid post");
        //     this.$toast.success({
        //   title:'',
        // message:''
        //     })
      } else {
        let obj = {
          inputValue: this.textAreaVal,
          id: null,
          createdOn: new Date(),
          modifiedOn: new Date(),
          like: null,
          comments: []
        };
        this.$store.dispatch("addPost", obj);
        this.isHidden = false;
        this.isShowBtn = false;
        this.textAreaVal = null;
        this.flgEdited = false;
        this.editedObj = null;
      }
    },

    updatePost() {
      if (this.textAreaVal == null || this.textAreaVal.trim() == "") {
        this.textAreaVal = "";
        this.$toast.top("Please enter valid post");
      } else {
        this.editedObj.inputValue = this.textAreaVal;
        // this.$store.dispatch("updatMethod", this.editedObj);
        this.isHidden = false;
        this.isShowBtn = false;
        this.textAreaVal = null;
        this.flgEdited = false;
        this.editedObj = null;
      }
    },

    hideTextArea() {
      this.isHidden = false;
      this.isShowBtn = false;
      this.textAreaVal = null;
      this.flgEdited = false;
      this.editedObj = null;
    },

    showTextArea() {
      this.isHidden = true;
      this.isShowBtn = true;
      this.textAreaVal = null;
      this.flgEdited = false;
      this.editedObj = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#headeDiv {
  display: inline-block;
  width: 60%;
  margin: 0 10% 0 30%;
  height: 30px;
}

#searchInput {
  font-size: 14px;
  border-radius: 0px;
  line-height: 40px;
  width: 60%;
  margin: 2px 10% 0 30%;
  padding-left: 10px;
}

#greetUserP {
  font-size: 21px;
  font-weight: 300;
  color: #212121;
}

.cloBtn {
  float: right;
  background: #eaeaea;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 3px;
  color: #212121;
}

#postContainer {
  border: 1px solid #fcca26;
  border-radius: 3px;
  height: 184px;
  background: transparent;
  width: 60%;
  margin: 0 10% 0 30%;
}

#text1 {
  z-index: auto;
  font-size: 14px;
  width: 100%;
  line-height: 33px;
  background: transparent;
  height: 130px;
  border: none;
  padding-left: 10px;
}
.postBtn {
  float: right;
  margin: 1%;
  border-color: #fcca26;
  background: #fcca26;
  font-size: 12px;
  color: #212121;
  border-radius: 4px;
  border-radius: 4px;
  border: none;
  min-width: 80px;
  height: 30px;
  font-weight: 600;
}
.footerDiv {
  background: #fff7de;
  border: 0;
  border-radius: 0 0 3px 3px;
  height: 50px;
}

.divText {
  display: flex;
  margin-top: 4px;
  margin-left: 2px;
}
.p1 {
  width: 24px;
  height: 24px;
  border-radius: 3px;
  background: #f5f5f5;
  text-align: center;
  color: #3f51b5;
  border-radius: 4px;
  line-height: 20px;
  font-weight: 700;
  margin: 9px 0 0 2px;
}
textarea:focus,
input:focus {
  outline: none;
  cursor: pointer;
}

body {
  line-height: 0 !important;
}
</style>
