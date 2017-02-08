import './style/main.less';
// var vue = require('vue');
import Vue from 'vue';
import MyDiv from './component/myComponent.vue';
console.log('hello !!');
console.log(Vue);

class AAA {
    constructor(args) {
        console.log(args);
    }

    // methods
}

new AAA(123);

let ccc = { a: 1 };
let bbb = {
    b: 'b',
    ...ccc
}
console.log(bbb);

Vue.component('my-div', MyDiv);
new Vue({
    el: '#app',
    data: {
        message: 'okkkk!!!',
    }
})
