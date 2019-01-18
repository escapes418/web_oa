import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';
import app from './modules/app';
import user from './modules/user';
import getters from './getters';
import permission from './modules/permission';
import resHandle from './modules/resHandle';
import reim from './modules/reim';
import contract from './modules/contract';
import cust from './modules/cust';
import coop from './modules/coop';
import log from './modules/log';
import map from './modules/map';
import staffWork from './modules/staffWork';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        resHandle,
        cust,
        coop,
        contract,
        reim,
        log,
        map,
        staffWork
    },
    getters
});

export default store;
