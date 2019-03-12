import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 1,
    },
    mutations:{
        addCart(){
            console.log('123');
        }
    }
});

export default store;