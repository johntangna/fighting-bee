import App from './App'
import "./style/base.scss"
import "./static/font/katong.css"
import "./style/main.scss"
import "./style/iconfont.css"
import "./plugin/animate/animate.css"
import store from './store'
import Cache from './utils/cache'
import util from 'utils/util'
import configs from './config/app.js'
import 'utils/interceptor.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$util = util
Vue.prototype.$config = configs
Vue.prototype.$Cache = Cache
const app = new Vue({
  ...App,
  store,
  Cache
})
app.$mount()
// #endif
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

