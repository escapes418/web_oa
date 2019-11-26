

function itemListInit() {
    function createUid() {
        return (
            parseInt((Math.random() * 100000) as any) +
            '' +
            new Date().getTime()
        );
    }
    return {
        // subs: [],
        subject : [],

        // 4项补充
        expenseAmt: '',
        remarks: '',

        // 2项补充
        billNum: '',
        subConfList: [],

        // 其他
        uid: createUid(),
        checked: false
    };
}
const repay = {
    state: {
        firstSub: 0,
        itemList: [] // 详情条目集合
    },
    mutations: {
        ADD_REPAY:(state)=>{
            let obj = itemListInit();
            state.itemList.push(obj)
        },
        CLEAN_ITEM_LIST:(state)=>{
            state.itemList = []
        },
        DEL_ITEM_LIST_CHECKED:(state)=>{
            let newItemList = state.itemList.filter(i=>{
                if(!i.checked){
                    return true
                }
            })
            state.itemList = newItemList
        },
        SET_ITEM_CHECKED:(state, data)=>{
            if (data) {
                state.itemList.forEach((element) => {
                    element.checked = true;
                });
            } else {
                state.itemList.forEach((element) => {
                    element.checked = false;
                });
            }
        },
        FILL_ITEM_LIST:(state, data)=>{
            state.itemList = data
        }
    },
    actions: {
        addRepay({commit}){
            commit('ADD_REPAY')
        },
        cleanItemList({commit}){
            commit('CLEAN_ITEM_LIST')
        },
        delItemListChecked({commit}, data){
            commit('DEL_ITEM_LIST_CHECKED', data);
        },
        setItemChecked({commit}, data){
            commit('SET_ITEM_CHECKED', data);
        },
        fillItemList({ commit }, data){
            commit('FILL_ITEM_LIST', data);
        }
    }
};

export default repay;
