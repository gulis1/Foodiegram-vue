import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import MQ from 'vue-match-media/src'
import "@/assets/global.css"

import UserPage from './components/UserPage.vue'
import LoginPage from './components/LoginPage.vue'
import PostPage from './components/PostPage.vue'
import UploadPage from './components/UploadPage.vue'


import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faUser as fasUser, faStar as fasStar, faCog, faUpload, faUserFriends, faChevronLeft, faChevronRight  } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar, faUser as farUser, faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.config.productionTip = false

Vue.use(MQ);
Vue.use(VueRouter);
Vue.use(VueLayers);

library.add(faSearch, fasUser, farUser, fasStar, farStar, faCog, faUpload, faUserFriends, faChevronLeft, faChevronRight, faArrowAltCircleRight);

Vue.component('font-awesome-icon', FontAwesomeIcon);

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
