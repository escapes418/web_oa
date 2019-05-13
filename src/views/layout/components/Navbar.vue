<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <breadcrumb></breadcrumb>
        <el-popover
            placement="bottom"
            width="330"
            class="count-message" 
            trigger="click"
            @show="showPop">
            <ul class="tabList">
                <li class="tabItem" :class="active=='1'? 'is-active':''" @click="handleClick(1)">未读</li>
                <li class="tabItem" :class="active=='0'? 'is-active':''" @click="handleClick(0)">已读</li>
            </ul>
            <div class="contentContain">
                <cell-box  v-for="(item,index) in listData" :key="index" @click.native="getDetail(item)">
                    <div class="messageContain">
                        {{item.sendMessage}}
                    </div>
                </cell-box>
            </div>
            <div class="add-btn mb-15" v-if="loadmore">
                <span class="pointer" @click="clickLoadMore()">点击加载更多</span>
            </div>
            <div class="prompt" v-if="total===0">
                <div class="mt-10">暂无数据</div>
            </div>

            <i class="el-icon-bell" slot="reference">
                <span class="badge">{{count}}</span>
            </i>
        </el-popover>
        <div class="changLog" @click="goChangLog">v{{userIn.version}}</div>
        
        <el-dropdown class="avatar-container" trigger="hover">
            
            <div class="avatar-wrapper">
                <div class="picTxt">
                    <div class="pic"><img class="user-avatar" :src="headUrl"></div>
                    <div class="txt">{{userInfo.name}}</div>
                </div>
                <!-- <i class="el-icon-caret-bottom"></i> -->
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>
                        <span @click="home" style="display:block;">系统主页</span>
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                    <span @click="modifyPwd" style="display:block;">修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                    <span @click="logout" style="display:block;">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import CellBox from '@/components/CellBox'
import mix from '@/mixins/common.mix'

export default {
    components: {
        Breadcrumb,
        Hamburger,
        CellBox
    },
    mixins:[mix],
    data() {
        return {
            headUrl: '',
            userIn: "",
            count:"0",
            active:"1",
            total:-1,
            pageTotal: 1,
            listData:[],
            listQuery:{
                pageNo:1,
                pageSize:10,
                readStatus:'1'
            },
            billType:""
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar',
        ]),
        loadmore() {
            if (this.listQuery.pageNo >= this.pageTotal) {
                return false;
            } else {
                return true;
            }
        }
    },
    created() {
        this.userIn = JSON.parse(localStorage.getItem("web_oa_userInfor")) || {};
        this.headUrl = this.avatar ? this.avatar + '?imageView2/1/w/80/h/80' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJBQkYwNjU4RjA0QjExRTdCQUFDOTgxOUNDREQwRjE1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJBQkYwNjU5RjA0QjExRTdCQUFDOTgxOUNDREQwRjE1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkFCRjA2NTZGMDRCMTFFN0JBQUM5ODE5Q0NERDBGMTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkFCRjA2NTdGMDRCMTFFN0JBQUM5ODE5Q0NERDBGMTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7oNRuaAAAMYUlEQVR42uxd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'

        this.$store.dispatch('FetchDictsAndLocalstore').then(() => {
            this.loading = false;
        }).catch(() => {
            this.loading = false;
            console.log('获取字典数据失败!');
        })
        this.loopGetList()
    },
    methods: {
        loopGetList(){
            setInterval(_=>{
                this.$store.dispatch('fetchCount').then((res)=>{
                    this.count = res.data.redCount;
                })
            },30000)
        },
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
        home() {
            this.$router.push({
                path: '/dashboard'
            })
        },
        logout() {
            this.$store.dispatch('LogOut').then(() => {
                location.reload() 
                this.$router.push({
                    path: '/login'
                })
            })
        },
        modifyPwd() {
            this.$router.push({ path: '/password'})
        },
        goChangLog(){
            window.open("#/changelog")
        },
        handleClick(type){
            this.active = type;
            this.listQuery.readStatus = type;
            this.listQuery.pageNo = 1;
            this.getList()
        },
        getList(){
            this.$store.dispatch('fetchMessage',this.listQuery).then((res)=>{
                this.count = res.data.redCount;
                this.listData = res.data.list;
                this.total = res.data.total || 0;
                this.pageTotal = Math.ceil(res.data.total / this.listQuery.pageSize);
            })
        },
        showPop(){
            this.getList()
        },
        clickLoadMore(){
            this.listQuery.pageNo++;
            this.$store.dispatch('fetchMessage',this.listQuery).then((res)=>{
                this.count = res.data.redCount;
                this.listData.push(...res.data.list);
                this.total = res.data.total || 0;
                this.pageTotal = Math.ceil(res.data.total / this.listQuery.pageSize);
                console.log(this.pageTotal)
            })
        },
        gotoDetail(item){
            return new Promise((resovle)=>{
                if (item.billType == 3) {
                    this.$router.push({
                        path: '/me/reimDetail',
                        query: { key: item.businessId, taskId: item.taskId, pathType: item.pathType }
                    })
                }
                if (item.billType == 4) {
                    this.$router.push({
                        path: '/me/recepDetail',
                        query: { key: item.businessId, taskId: item.taskId, pathType: item.pathType }
                    })
                }
                if (item.billType == 5) {
                    this.$router.push({
                        path: '/me/travelingDetail',
                        query: { key: item.businessId, taskId: item.taskId, pathType: item.pathType }
                    })
                }
                if (item.billType == 6) {
                    this.$router.push({
                        path: '/me/resourceDetail',
                        query: { key: row.businessId, taskId: row.taskId, pathType: item.pathType }
                    })
                }
                if (item.billType == 7) {
                    this.$router.push({
                        path: '/me/resHandleDetail',
                        query: { key: item.businessId, taskId: item.taskId, pathType: item.pathType }
                    })
                }
                if (item.billType == 9) {
                    this.$router.push({
                        path: '/me/contractCheckDetail',
                        query: { key: item.businessId, taskId: item.taskId, pathType: item.pathType }
                    })
                }
                if (item.billType == 10) {
                    this.$router.push({
                        path:'/inforManage/contractFillDetail',
                        query: { key: item.id }
                    })
                }

                const { fullPath } = this.$route;
                this.$router.replace({
                    path: '/redirect' + fullPath
                })
                resovle()
            })
        },
        getDetail(item){
            this.gotoDetail(item).then(()=>{
                setTimeout(_=>{
                    this.getList()
                },1000)
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tabList{
    width: 100%;
    display: flex;
}
.tabItem{
    flex: 0 0 50%;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
}
.is-active{
    color: #409eff;
    height: 2px;
    background-color: #409eff;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
}
.add-btn {
    margin-top: 15px;
    text-align: center;
    text-decoration: underline;
    color: orange;
}
.pointer {
    cursor: pointer;
}
.prompt div{
    margin-top:20px;
    text-align: center;
}
.contentContain{
    max-height: 400px;
    overflow: auto;
}
.navbar {
    height: 50px;
    // line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
        // line-height: 58px;
        // height: 50px;
        float: left;
        padding: 0 10px;
    }
    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
.picTxt{
    display: flex;
    align-items: center;
    .pic{
        flex: 0 0 auto;
    }
    .txt{
        flex: 1;
        padding-left: 6px;
    }
}
.changLog{
    display: block;
    float: right;
    margin-right: 10px;
    line-height: 49px;
    font-size: 14px;
    cursor: pointer;
}
.count-message{
    display: block;
    float: right;
    margin-right: 150px;
    line-height: 49px;
    font-size: 24px;
    cursor: pointer;
}
.messageContain{
    font-size: 12px;
    margin-top: 5px;
}
.badge{
    display: inline-block;
    text-align: center;
    background: #f74c31;
    color: #fff;
    font-size: 10px;
    height: 16px;
    line-height: 16px;
    border-radius: 8px;
    padding: 0 4px;
    background-clip: padding-box;
    vertical-align: middle;
    margin:0 0 15px -10px;
}
</style>

