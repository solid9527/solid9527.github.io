import Vue from 'vue'
import App from './App' // import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'



//vux
// import Vuex from 'vuex'
// import axios from 'axios'
// Vue.use(Vuex)

// let store = new Vuex.Store({
//   state: {
//     todos: [1,2,3],
//   },
//   mutations: {
//     setTodos(state, value) {
//       state.todos = value
//     }
//   },
//   actions: {
//     loadTodos(context) {
//       axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
//         context.commit("setTodos", res.data);
//       })

//     }
//   }
// })



import store from './store'
// import router from './router'

// import 'element-ui/lib/theme-chalk/index.css'

//註冊元件 全局使用
import RecordList from './components/RecordList'
import MenuBar from './components/MenuBar'
import PageTest from './components/pages/pagetest'

Vue.component("RecordList", RecordList);
Vue.component("MenuBar", MenuBar);

Vue.use(VueRouter)
Vue.use(ElementUI);


const routes = [{
    path: '/MenuBar',
    component: MenuBar
  },
  {
    path: '/RecordList',
    component: RecordList
  },
  {
    path: '/test',
    component: PageTest
  }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})



store.commit("setTodos", [1, 2, 3]);
store.dispatch("loadTodos");

var vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
