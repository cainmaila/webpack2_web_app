<style>
@import '../style/color.less';
#myDiv {
    width: 100%;
    height: 100px;
    background-color: #000;
    color: #fff;
    p {
        background-color: @color_1;
    }
}

#ccc {
    display: flex;
}
</style>
<template>
    <div id="myDiv">
        <p>My Div!!</p>
        <router-link to="/page">Page</router-link>
    </div>
</template>
<script>
/**
 * @file
 * MyDiv Vue組件
 */

/**
 * @namespace MyDiv
 * @type {Object}
 * myDiv Vue組件
 */
export default {
    /**
     * 屬性
     * @memberof MyDiv
     */
    data: function() {
        return {

        }
    },
    methods: {}
}
</script>
