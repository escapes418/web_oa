function createUid() {
    return (
        parseInt((Math.random() * 100000) as any) +
        '' +
        new Date().getTime()
    );
}
function itemInitData() {
    return {
        // 6(5)项基本信息
        lat:'',
        lng:'',
        nodeAddress:'',
        nodeName:'',
        // 其他
        uid: createUid(),
        checked: false
    };
}
const map = {
    state: {
        itemList: [] // 详情条目集合
    },
    mutations: {
        CLEAR_LIST: (state, data) => {
            state.itemList = [];
        },
        ADD_ITEM: (state, data) => {
            let obj = itemInitData();
            state.itemList.push(obj);
        },
        FILL_ITEM_LIST: (state, data) => {
            data.forEach(item=>{
                item.uid = createUid();
                item.checked = false;
            })
            state.itemList = data;
        },
        FILL_ITEM_LIST_CHECKED: (state, data) => {
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
        DEL_ITEM_LIST_CHECKED: (state, data) => {
            let newItemList = state.itemList.filter((i) => {
                if (!i.checked) {
                    return true;
                }
            });
            state.itemList = newItemList;
        },
        
    },
    actions: {
        clearList({ commit }) {
            commit('CLEAR_LIST');
        },
        // 集合中添加新项
        addItem({ commit }) {
            commit('ADD_ITEM');
        },
        // 修改暂时不考虑
        // ...
        // 填充集合
        fillItemList({ commit }, data) {
            commit('FILL_ITEM_LIST', data);
        },
        // 设置集合的checkbox状态
        fillItemListChecked({ commit }, data) {
            commit('FILL_ITEM_LIST_CHECKED', data);
        },
        // 删除选中
        delItemListChecked({ commit }, data) {
            commit('DEL_ITEM_LIST_CHECKED', data);
        },
    }
};

export default map;
