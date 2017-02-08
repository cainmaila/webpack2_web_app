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
export default {
    data: function() {
        return {

        }
    },
    methods: {}
}
</script>
