import Vue from 'vue'
import App from './App.vue'
import 'bootstrap-icons-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import MQ from 'vue-match-media/src'
import "@/assets/global.css"

Vue.config.productionTip = false

Vue.use(MQ);

new Vue({
  render: h => h(App),
}).$mount('#app')
