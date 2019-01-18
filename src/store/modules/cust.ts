
const cust = {
  state: {
    custListPlace: "4",
  },
  mutations: {
    CHANGE_CUST: (state,data) => {
      state.custListPlace = data;
    }
  },
  actions: {
    changeCust({
      commit
    }, data) {
      commit('CHANGE_CUST', data);
    }
  }
}

export default cust
