
import { MutationTree, Module } from 'vuex';
export interface LOG_state {
    queryType: string;
}
const log:Module<LOG_state,any> = {
    state: {
        queryType: "2",
    },
    mutations: {
        CHANGE_LOG: (state,data) => {
          state.queryType = data;
        }
    },
    actions: {
        changeLog({
            commit
        }, data) {
            commit('CHANGE_LOG', data);
        }
    }
}

export default log
