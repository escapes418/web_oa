
const copp = {
    state: {
        coopListPlace: "1",
    },
    mutations: {
        CHANGE_COOP: (state,data) => {
          state.coopListPlace = data;
        }
    },
    actions: {
        changeCoop({
            commit
        }, data) {
            commit('CHANGE_COOP', data);
        }
    }
}

export default copp
