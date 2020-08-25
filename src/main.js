import Vue from 'vue'
import { Container, Aside, Main, Menu, MenuItem, Row, Col, Card, Button, Badge, Avatar, Dialog, Input } from 'element-ui'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/style.scss'
import App from './App.vue'

Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Button)
Vue.use(Badge)
Vue.use(Avatar)
Vue.use(Dialog)
Vue.use(Input)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
