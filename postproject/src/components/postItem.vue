<template>
  <div id="itemDiv" style="width: 60%;margin: 2px 10% 0 30%;">
    <!-- <div v-if="isShowBtn" style="width:100%;display: inline-block;margin-top: 15px;">
        <button @click="closeMethod" style="float:right;">
          <img src="https://img.icons8.com/material/24/000000/multiply.png">
        </button>
      </div>
    <div v-if="isShowBtn" id="welcomeDiv1">
      <div class="divText">
        <p class="p3">T</p>
        <textarea id="text1" v-model="getEditPostItem.inputValue"></textarea>
      </div>
      <div class="BtnDiv">
        <button class="btn" style="margin: 8px;" @click="SaveMethod">Save</button>
      </div>
    </div>-->
    <div v-if="postItemObj">
      <div class="div1">
        <div class="tUserButon">
          <div class="p2">Temporary User
            <div>{{formatDate(postItemObj.modifiedOn)}}</div>
          </div>
          <div class="btnFormat">
            <b-dropdown
              id="ddown1"
              style="background-color: none;height: 30px;background: #f5f5f5;"
              no-caret
            >
              <template slot="button-content">
                <i class="fa fa-ellipsis-h" style="font-size:36px"></i>
              </template>
              <b-dropdown-item @click="DeletPostItem">
                <i class="fa fa-trash-o" style="font-size: 16px;">
                  <span style="margin:0 5px;">Delete</span>
                </i>
              </b-dropdown-item>
              <b-dropdown-item @click="EditPostItem">
                <i class="fa fa-edit" style="font-size: 16px;">
                  <span style="margin:0 5px;">Edit</span>
                </i>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>

        <div class="postli">
          <p class="p1">T</p>
          <div class="postUl">
            <span style="padding:5px;">{{postItemObj.inputValue}}</span>
          </div>
          <div class="LikeCOmentDiv">
            <div style="float:left">
              <i
                @click="LikeMethod"
                id="icon"
                class="fa fa-heart-o"
                style="margin: 0 10px;font-size: 15px;cursor: pointer;font-weight: bolder;"
              ></i>Likes:
              <span v-if="isShowLike">{{postItemObj.like}}</span>
            </div>
           
            <div>
              <button class="comentBtn1" @click="commentMthod">comment</button>
            </div>
          </div>

          <div v-if="showcomenText" class="comentOutPut">
            <p class="commentoutputP">T</p>
            <div>

              <span v-for="obj in postItemObj.comments" style="padding: 22px;line-height: 3;">
                <div>{{obj.comment}}</div>
              </span>
            </div>
            <button v-if="replyBtn" class="repliesbutton" @click="replyMethod">Replies</button>
          </div>

          <!-- <div id="ReplyComent" style="display:none">
            <p class="RplyComentT">T</p>
            <textarea
              id="replyTextARea"
              style="width:100%"
              placeholder="Start typing here"
              autofocus
            ></textarea>
            <div style="float:right">
              <button class="comentBtn">Ok</button>
            </div>
          </div> -->
        </div>
      </div>
      <div  v-if="isShowComent" style="background: #fff7de;margin-top:7%">
        <div class="divtextAreaComent" style="height: 128px;">
          <div class="divTextComenheader">
            <p class="pcoment">T</p>
            <textarea
              id="AddComent"
              style="width:100%"
              v-model="comentValue"
              placeholder="Start typing here"
              autofocus
            ></textarea>
          </div>
          <div class="footerDiv" style="float:right">
            <button class="comentBtn" @click="addcoment">Add Comment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as moment from "moment";

export default {
  name: "postItem",
  props: ["postItemObj"],

  data() {
    return {
      replyBtn: false,
      isShowComent:false,
      textcoment: {},
      isShowLike: false,
      showcomenText:false,
      comentValue: ""
    };
  },
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
    },
    // comentObject: {
    //   get: function() {
    //     return this.$store.state.comentValue;
    //   },
    //   set: function(value) {
    //     return this.$store.dispatch("commentData", value);
    //   }
    // },
    // ...mapGetters(["getEditPostItem", "getComentReturn", "getsavMethod"])
  },
  methods: {
    formatDate(d) {
      return moment(d).format("DD-MMM-YYYY h:mm:ss a");
    },

    // fetchData(){
    //   this.$store.dispatch('commentData');
    // },
    DeletPostItem() {
      this.$store.dispatch("DeletPostItem", this.postItemObj);
      this.$toast.top("Delet this item");
      console.log(this.postItemObj);
    },
    EditPostItem() {
      this.isHidden = true;
      this.postItemObj.modifiedOn = new Date();
      this.editedObj = this.postItemObj;
      this.textAreaVal = this.editedObj.inputValue;
      console.log("helo i am post item", this.editedObj);
      this.flgEdited = true;
      this.isHidden = true;
      this.isShowBtn = true;
    },
    closeMethod() {
      this.isShowBtn = false;
    },
    commentMthod() {
        this.isShowComent=true;
      // document.getElementById("comentText").style.display = "block";
    },
    addcoment() {
      let comentObj = {
        comment:null,
        createdOn: new Date()
      };
    comentObj.comment=  this.comentValue;
      let length= this.postItemObj.comments.length;
      // alert("length"+length)
      console.log("length  of object ",length)
      // this.postItemObj.comments[length]=comentObj
      this.postItemObj.comments.push(comentObj);
      if(length===0){
    this.postItemObj.comments[length]=comentObj
      } else{
        this.postItemObj.comments[length+1]=comentObj
      }
      this.comentValue='';
      //  this.postItemObj.comments=comentObj;
      // alert()
      // console.log("this.postItemObj.comments",this.postItemObj.comments[length]=comentObj)
      // console.log("this.comentObj",this.postItemObj.comments);
      // this.$store.dispatch("commentData", comentObj);
      //  docume nt.getElementsByClassName('repliesbutton').style.display="block";
      this.replyBtn = true;
      
     this.showcomenText=true
    },

    LikeMethod() {
      if (this.action == 1) {
        document.getElementById("icon").style.color = "red";
        this.isShowLike = true;
        this.action = 2;
      } else {
        document.getElementById("icon").style.color = "grey";
        this.isShowLike = false;
        this.action = 1;
      }
    this.isShowComent=false
    this.showcomenText=false;
    },
    replyMethod() {
      document.getElementById("ReplyComent").style.display = "block";
    }
  }
  // mounted(){
  //   this.fetchData();
  // }
};
</script>

<style scoped>
#ddown1 {
  background-color: none;
  border-color: #6c757d;
}
.div1 {
  margin-top: 31px;
  border: 1px solid;
}
.postUl {
  width: 100%;
  margin: 0 10px;
  background: #fff;
  -webkit-box-shadow: 0 2px 5px 0 hsla(0, 6.7%, 68%, 0.2),
    0 2px 11px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 5px 0 hsla(0, 6.7%, 68%, 0.2),
    0 2px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  height: 70px;
}
.postli {
  display: block;
  border-radius: 3px;
  font-weight: 300;
  font-size: 19px;
  border-radius: 4px;
  padding: 10px;
}
.btnFormat {
  font-size: 20px;

  height: 10px;
  border-radius: 3px;
  background: #f5f5f5;
  border-radius: 4px;
  line-height: 20px;
}

.p1 {
  width: 10%;
  height: 70px;
  background: #f5f5f5;
  text-align: center;
  color: #3f51b5;
  font-weight: 400;
  font-size: 50px;
  border-radius: 4px;
  line-height: 70px;
  float: left;
}
.p2 {
  width: 100%;
  height: 31px;
  border-radius: 3px;
  background: #f5f5f5;
  text-align: center;
  color: #3f51b5;
  font-size: 12px;
  border-radius: 4px;
  line-height: 15px;
}
#welcomeDiv1 {
  border: 1px solid #fcca26;
  width: 100%;
  border-radius: 3px;
  line-height: 33px;
  height: 184px;
  background: transparent;
}
.btnFormat {
  float: right;
}
.tUserButon {
  display: flex;
}

#text1 {
  width: 100%;
  border-radius: 3px;
  line-height: 33px;
  margin-left: 5px;
  margin-top: 10px;
  background: transparent;
  height: 120px;
  border: none;
}
textarea:focus,
input:focus {
  outline: none;
}

.BtnDiv {
  padding: 3px 5px;
  background: #fff7de;
  border: 0;
  border-radius: 0 0 3px 3px;
  height: 48px;
}

.btn {
  float: right;
  margin-right: 1%;
  border-color: #fcca26;
  background: #fcca26;
  font-size: 12px;
  color: #212121;
  border-radius: 4px;
  border-radius: 4px;
  border: none;
  min-width: 80px;
  height: 30px;
}
.divText {
  display: flex;
  margin-top: 4px;
  margin-left: 2px;
}
.p3 {
  width: 29px;
  height: 29px;
  border-radius: 3px;
  background: #f5f5f5;
  text-align: center;
  color: #3f51b5;
  border-radius: 4px;
  line-height: 25px;
  margin-left: 10px;
  margin-top: 20px;
}
/* .cloBtn {
  float: right;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 3px;
  color: #212121;
} */

.comentBtn {
  /* position: absolute;
    margin: 1%;
   
    bottom: 25%;
    right: 10%;
    margin-top: 0; */
  border-color: #fcca26;
  background: #fcca26;
  font-size: 12px;
  /* color: #212121; */
  border-radius: 4px;
  border-radius: 4px;
  border: none;
  min-width: 80px;
  height: 30px;
  /* font-weight: 60; */
}

.divtextAreaComent {
  background: #fff7de;
  padding: 5px;
  position: relative;
  border-radius: 5px;
  margin: 0 30px 0 70px;
}

.divTextComenheader {
  display: flex;
  width: 76%;
}
.LikeCOmentDiv {
  margin-top: 2%;
  border-top: 1px solid #e4e4e4;
}
.comentBtn1 {
  margin-left: 28%;
}

.comentOutPut {
  display: flex;
  border-radius: 3px;
  font-weight: 300;
  font-size: 19px;
  border-radius: 4px;
  padding: 10px;
}
.commentoutputP {
  width: 29px;
  height: 29px;
  border-radius: 3px;
  background: #f5f5f5;
  text-align: center;
  color: #3f51b5;
  border-radius: 4px;
  line-height: 25px;
  margin-left: 10px;
  margin-top: 20px;
}
</style>
