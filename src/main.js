import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'
import './assets/css/index.css'

import {
  Button,
  Row,
  Col,
  Search,
  Area,
  List,
  Swipe,
  SwipeItem,
  Lazyload,
  Field,
  NavBar,
  Tabs,
  Tab,
  Icon,
  Cell,
  PullRefresh,
  Toast,
  Stepper,
  Tabbar,
  TabbarItem
} from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Search)
Vue.use(Area)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(List)
Vue.use(Lazyload)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(PullRefresh)
Vue.use(Toast)
Vue.use(Stepper)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
