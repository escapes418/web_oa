
const region = {
  state: {
    regionData: [],
  },
  mutations: {
    CHANGE_REGION: (state,data) => {
      state.regionData = data;
    }
  },
  actions: {
    changeRegion({
      commit
    }, data) {
      commit('CHANGE_REGION', data);
    }
  }
}

export default region
