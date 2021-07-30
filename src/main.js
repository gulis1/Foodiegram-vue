import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'bootstrap-icons-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import MQ from 'vue-match-media/src'
import "@/assets/global.css"

import UserPage from './components/UserPage.vue'
import LoginPage from './components/LoginPage.vue'
import PostPage from './components/PostPage.vue'
import UploadPage from './components/UploadPage.vue'


import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader


Vue.config.productionTip = false

Vue.use(MQ);
Vue.use(VueRouter);
Vue.use(VueLayers)

const routes = [
  {path: '/users/:name', component: UserPage},
  {path: '/login', component: LoginPage},
  {path: '/posts/:postID', component: PostPage},
  {path: '/upload', component: UploadPage}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
