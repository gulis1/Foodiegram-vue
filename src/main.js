import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'bootstrap-icons-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import MQ from 'vue-match-media/src'
import "@/assets/global.css"

import UserPage from './components/UserPage.vue'
// import PostPage from './components/PostPage.vue'

Vue.config.productionTip = false

Vue.use(MQ);
Vue.use(VueRouter);

const routes = [
  {path: '/users/:name', component: UserPage},
  // {path: '/posts/:id', component: PostPage}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
