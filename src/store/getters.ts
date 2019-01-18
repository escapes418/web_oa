const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    addRouters: state => state.permission.addRouters,
    permission_routers: state => state.permission.routers,
    addRouterLenght: state => state.permission.addRouters.length,
    
    firstSubList :state =>{
        var tempArr=[];
        state.reim.subsList.forEach(function (item, index) {
            if(item.parent == 0){
                tempArr.push(item);
            }
        })
        return tempArr;
    },
};
export default getters;
