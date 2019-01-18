import { MutationTree, Module } from 'vuex';
export interface ISF_state {
    name: string;
    age: number;
    job: string;
    male: boolean;
    skill?: (lauange: string) => void;
}
const copp: Module<ISF_state, any> = {
    state: {
        name: 'tony',
        age: 18,
        job: 'front-end',
        male: true
    },
    mutations: {
        SET_NAME: (state, data) => {
            state.name = data;
        },
        CHANGE_SEX: (state, data) => {
            state.male = data;
        }
    },
    actions: {
        setName({ commit }, data) {
            setTimeout(() => {
                commit('SET_NAME', data);
            }, 1000);
        }
    }
};

export default copp;
