import { getSubjects, getSubjectsNew } from '@/api/reception';

function detailInitData() {
    function createUid() {
        return (
            parseInt((Math.random() * 100000) as any) +
            '' +
            new Date().getTime()
        );
    }
    return {
        // 6(5)项基本信息
        startDate: '',
        endDate: '',
        startPoint: [],
        endPoint: [],
        subs: [],
        selectedSubject: [],

        // 4项补充
        dayNum: 1,
        personNum: 1,
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
const reim = {
    state: {
        subsList: [],
        firstSub: 0,
        subsListKeyVal: {},

        subsTree: [], // 树形科目
        subsPar: [], // 平行科目
        detailCollection: [] // 详情条目集合
    },
    getters: {
        doneTodos: (state) => {
            // return state.todos.filter(todo => todo.done)
            return 'nothing';
        }
    },
    mutations: {
        SET_SUBS: (state, data) => {
            state.subsList = data;
        },
        SUBSLIST_KEYVAL: (state, data) => {
            state.subsListKeyVal = data;
        },
        Fill_SUBSTREE: (state, data) => {
            state.subsTree = data;
        },
        Fill_SUBSPAR: (state, data) => {
            state.subsPar = data;
        },
        CLEAR_COLLECTION: (state, data) => {
            state.detailCollection = [];
        },
        ADD_DETAIL: (state, data) => {
            let obj = detailInitData();
            state.detailCollection.push(obj);
        },
        FILL_DETAIL_COLLECTION: (state, data) => {
            state.detailCollection = data;
        },
        FILL_DETAIL_COLLECTION_CHECKED: (state, data) => {
            if (data) {
                state.detailCollection.forEach((element) => {
                    element.checked = true;
                });
            } else {
                state.detailCollection.forEach((element) => {
                    element.checked = false;
                });
            }
        },
        DEL_DETAIL_COLLECTION_CHECKED: (state, data) => {
            let newDetailCollection = state.detailCollection.filter((i) => {
                if (!i.checked) {
                    return true;
                }
            });
            state.detailCollection = newDetailCollection;
            /* state.detailCollection.forEach((element, index, self) => {
                if (element.checked) {
                    self.splice(index, 1);
                }
            })
            console.log(state.detailCollection); */
        },
        UPDATE_COLLECTION_IMG: (state, data) => {
            // 比较差的处理方式
            var clone = JSON.parse(JSON.stringify(state.detailCollection));
            clone.forEach((item, index, self) => {
                if (data.uid == item.uid) {
                    item.subConfList.forEach((i, idx) => {
                        if (i.id == data.id) {
                            i.url = data.url;
                            i.urlPrefix = data.urlPrefix;
                        }
                    });
                }
            });
            state.detailCollection = clone;
            console.log('updated collection', state.detailCollection);
        },
        UPDATE_COLLECTION_ITEM: () => {
            // 待完善
        }
    },
    actions: {
        setSubs({ commit }, data) {
            commit('SET_SUBS', data);
        },
        subslistKeyVal({ commit }, data) {
            // console.log(data);
            commit('SUBSLIST_KEYVAL', data);
        },
        // 清空集合
        clearCollection({ commit }) {
            commit('CLEAR_COLLECTION');
        },
        // 获取2种维度科目数据并填充
        async getSubs({ commit }) {
            let response: any = await getSubjects({
                isFirst: '0',
                parSubCode: ''
            });
            commit('Fill_SUBSPAR', response.data.list || []);
            let responseNew: any = await getSubjectsNew({});
            commit('Fill_SUBSTREE', responseNew.data.list || []);
        },
        // 集合中添加新项
        addDetail({ commit }) {
            commit('ADD_DETAIL');
        },
        // 修改暂时不考虑
        // ...
        // 填充集合
        fillDetailCollection({ commit }, data) {
            commit('FILL_DETAIL_COLLECTION', data);
        },
        // 设置集合的checkbox状态
        fillDetailCollectionChecked({ commit }, data) {
            commit('FILL_DETAIL_COLLECTION_CHECKED', data);
        },
        // 删除选中
        delDetailCollectionChecked({ commit }, data) {
            commit('DEL_DETAIL_COLLECTION_CHECKED', data);
        },
        // 更新嵌套较深的图片
        updateCollectionImg({ commit }, data) {
            commit('UPDATE_COLLECTION_IMG', data);
        }
    }
};

export default reim;
