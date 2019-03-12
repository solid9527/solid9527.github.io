import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    todos: [1, 2, 3],
  },
  mutations: {
    setTodos(state, value) {
      state.todos = value
    }
  },
  actions: {
    loadTodos(context) {
      axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
        context.commit("setTodos", res.data);
      })

    }
  }
})

export default store