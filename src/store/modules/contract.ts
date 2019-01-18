const contract = {
    state:{
        initData:[]
    },
    mutations:{
        SET_DATA:(state,data)=>{
            state.initData = data
        },
        CHANGE_ITEM:(state,data)=>{
            state.initData.forEach(item => {
                item.contractPartyType.forEach(i=>{
                    if(i.columnName == data.columnName){
                        i.value = data.value
                    }
                })
                
            });
        },
        DISPATCHITEM_ITEM:(state,data)=>{
            state.initData.forEach(item =>{
                for(let key in data){
                    item.contractPartyType.forEach(i=>{
                        if(i.columnName == key){
                            i.value = data[key]
                        }
                    })                 
                }
                // Object.keys(data).forEach(key=>{
                //     if(item.columnName == key){
                //         item.value = data[key]
                //     }
                // })
            })
        },
        CLENAINIT:(state)=>{
            state.initData = []
        },
        CLEAN_ITEM:(state,data)=>{
            state.initData.forEach(item=>{
                if(item.partyType == data.memberType){
                    item.contractPartyType.forEach(i=>{
                        i.value = ''
                    })
                }     
            })
        }
    },
    actions:{
        setData({
            commit
        },data){
            commit('SET_DATA',data)
        },
        changeItem({
            commit
        },data){
            commit('CHANGE_ITEM',data)
        },
        dispatchItem({
            commit
        },data){
            commit('DISPATCHITEM_ITEM',data)
        },
        cleanInit({
            commit
        }){
            commit('CLENAINIT')
        },
        cleanItem({
            commit
        },data){
            commit('CLEAN_ITEM',data)
        }
    }
}

export default contract