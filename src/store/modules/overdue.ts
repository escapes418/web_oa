
const overdue = {
  state: {
    nums: "1",
  },
  mutations: {
    CHANGE_NUM: (state,data) => {
      state.nums = data;
    }
  },
  actions: {
    changeNum({
      commit
    }, data) {
      commit('CHANGE_NUM', data);
    }
  }
}

export default overdue
