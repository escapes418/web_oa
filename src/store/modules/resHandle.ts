const resHandle = {
    state: {
        personelNumber: 0,
    },
    mutations: {
        CHANGE_PER_NUM: (state, data) => {
            state.personelNumber = data;
        }
    },
    actions: {
        changeperNum({
            commit
        }, data) {
            commit('CHANGE_PER_NUM', data);
        }
    }
}

export default resHandle
