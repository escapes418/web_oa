
const project = {
    state: {
        activeTop: "0",
        activeProcesss:"1",
    },
    mutations: {
      CHANGE_TOP: (state,data) => {
        state.activeTop = data;
      },
      CHANGE_PROCESSS:(state, data) =>{
        state.activeProcesss = data;
      }
    },
    actions: {
      changeTop({
        commit
      }, data) {
        commit('CHANGE_TOP', data);
      },
      changeProcesss({
        commit
      }, data) {
        commit('CHANGE_PROCESSS', data);
      }
    }
  }
  
  export default project