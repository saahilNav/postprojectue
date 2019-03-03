import Vue from 'vue'
import App from './App.vue'
import store from './store/PostStore.js';
import VueRouter from 'vue-router';
import postItem from './components/postItem';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted';
 
import VuejsDialog from 'vuejs-dialog';

Vue.use(VuejsDialog);

import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast);


import CxltToastr from 'cxlt-vue2-toastr'

Vue.use(CxltToastr)
Vue.use(Toasted)
 
Vue.config.productionTip = false

Vue.use(BootstrapVue);

 export const bus=new Vue();
Vue.use(VueRouter);
export const router=new VueRouter({
  mode:'history',
  routes:[
     {path:'/post/:id', component:postItem},
  ]
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')





