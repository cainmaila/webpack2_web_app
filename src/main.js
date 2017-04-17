import 'style/global.less'
import "babel-polyfill"
// import axios from 'axios'
import MyDiv from 'myDiv_component'
// import MyPage from 'myPage_component';
import ModulesA from './store/modules/moduleA.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import I18nPlugin from './i18nPlugin.js'
//多語系設置一定要在new Vue 前

async function init() {
    //多語系
    Vue.use(VueI18n)
    let i18nPlugin = new I18nPlugin('ja')
    let i18n = await i18nPlugin.initIn18nSync(VueI18n) // Vue.component('my-div', MyDiv);
    Vue.use(VueRouter);
    const router = new VueRouter({
        routes: [{
            path: '/',
            component: MyDiv
        }, {
            path: '/page',
            component: resolve => require(['myPage_component'], resolve)
        }, ]
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

    const vm = new Vue({
        el: '#app',
        router,
        store,
        i18n,
    });

    //解換語系
    // await i18nPlugin.setLangSync('en')
}

init()
