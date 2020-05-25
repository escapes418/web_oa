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
import project from './modules/project';
import coop from './modules/coop';
import log from './modules/log';
import map from './modules/map';
import overdue from './modules/overdue';
import staffWork from './modules/staffWork';
import repay from './modules/repay';
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
        repay,
        log,
        map,
        staffWork,
        overdue,
        project
    },
    getters
});

export default store;
