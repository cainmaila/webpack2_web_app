import { ADD, LOAD_DATA } from "../types.js";
export default {
    state: {
        count: 0,
        myData: {},
        myVal: '',
    },
    getters: {
        countStr: (state) => {
            return '共有' + state.count + '個';
        },
    },
    mutations: {
        [ADD](state, payload) {
            state.count += payload.num;
        },
        setData(state, payload) {
            if (typeof payload.data === 'string') {
                state.myData = JSON.parse(payload.data);
            } else {
                state.myData = payload.data;
            }
        },
        setMyVal(state, payload) {
            state.myVal = payload.val;
        },
    },
    //這是註解ABC123
    actions: {
        [ADD]({ state, commit, rootState }, payload) {
            commit('add', payload);
        },
        async [LOAD_DATA]({ state, commit, rootState }) {
            rootState.isLoading = true;
            try {
                let data = await fetch('./data.json');
                data = await data.json();
                rootState.isLoading = false;
                commit('setData', { data });
            } catch (err) {
                console.error(err);
                rootState.isLoading = false;
            }
        },
        setMyVal({ state, commit, rootState }, payload) {
            commit('setMyVal', payload);
        },
    },
}
