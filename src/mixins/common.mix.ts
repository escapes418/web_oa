import { mapGetters ,mapState} from 'vuex';
export default {
    computed:{
        ...mapState({
            // userInfo: state =>state.user.userInfo
        })
    },
}
