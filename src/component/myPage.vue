<style>
@import '../style/color.less';
#myPage {
    width: 100%;
    height: 100px;
    background-color: #000;
    color: #fff;
    p {
        background-color: @color_2;
    }
}

#pcx {
    width: 100%;
    height: 200px;
    background-image: url('./cat1.jpg');
}
</style>
<template>
    <div id="myPage">
        <p>{{pageName}} || {{countStr}} || {{modulesA}}</p>
        <p @click="clickMe">999按我 + {{modulesA.myVal}}</p>
        <input type="text" :value="modulesA.myVal" @input="onChange">
    </div>
</template>
<script>
/**
 * @file
 * MyPage Vue組件
 */

import Vuex from 'vuex';
import {
    ADD,
    LOAD_DATA,
} from "../store/types.js";

/**
 * @namespace MyPage
 * @type {Object}
 * myPage Vue組件
 */
export default {
    data: function() {
        return {
            /**
             * 參考名稱
             * @memberof MyPage
             * @type {String}
             */
            pageName: 'My Page !!',
        }
    },
    computed: {
        ...Vuex.mapState(['modulesA']),
        ...Vuex.mapGetters(['countStr']),
    },
    methods: {
        /**
         * clickMe方法
         * @memberof MyPage
         * @fires myeve
         */
        clickMe() {
            this[ADD]({
                num: 2
            });
            this[LOAD_DATA]();
        },
        onChange(e) {
            this.setMyVal({
                val: e.target.value
            });
        },
        ...Vuex.mapActions([ADD, LOAD_DATA, 'setMyVal']),
    }
}
</script>
