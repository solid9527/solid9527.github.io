<template>
  <div id="app">
    <div class="logo">
      <img src="./assets/logo.png">
    </div>

    <router-link to="/RecordList">RecordList</router-link>
    <router-link to="/MenuBar">MenuBar</router-link>
    <router-link to="/test">PageTest</router-link>

    <!-- <RecordList :records="records" @removeListItem="listRemoveItem" @additem="additem"></RecordList> -->
    <!-- <MenuBar></MenuBar> -->

    <transition name="page" mode="out-in">
      <router-view>
    
      </router-view>
    </transition>

      <ul>
        <li v-for="todo in todos" >
          {{todo.title}}
        </li>
      </ul>

      <button @click="loadTodos">讀取列表</button>
    

  </div>
</template>

<script>
  //單頁面使用元件
  // import RecordList from './components/RecordList'
  // import MenuBar from './components/MenuBar'

  import { mapState , mapMutations , mapActions} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
      }
    },
    computed: {
      ...mapState(['todos']),
      username() {
        // 我们很快就会看到 `params` 是什么
        return this.$route.params.username
      }
    },
    mounte(){
      this.setTodos(['a','b','c'])
    },
    //單頁面使用元件
    // components: {
    //   RecordList: RecordList
    // },
    methods: {
      ... mapMutations(['setTodos']),
      ... mapActions(['loadTodos'])
      ,
      goBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      },
      
    }
  }

</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    padding: 25px;
  }

  .page-enter-active,
  .page-leave-active{
    transition: 0.5s;
  }

  .page-enter,
  .page-leave-active{
    opacity: 0;
    transform: translateY(10px)
  }

  html,
  body {
    background-color: #dbcdb8;
  }

  h1,
  h2 {
    font-weight: normal;
    font-size: 50px;
  }

  a {
    color: #42b983;
  }

  .logo {
    text-align: center;
  }

</style>
