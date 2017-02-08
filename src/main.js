import "babel-polyfill";
import MyDiv from './component/myDiv.vue';
import MyPage from './component/myPage.vue';
import ModulesA from './store/modules/moduleA.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

// Vue.component('my-div', MyDiv);
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        { path: '/', component: MyDiv },
        { path: '/page', component: MyPage },
    ]
});

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isLoading: false,
    },
    modules: {
        modulesA: ModulesA,
    }
});

new Vue({
    el: '#app',
    router,
    store,
});
