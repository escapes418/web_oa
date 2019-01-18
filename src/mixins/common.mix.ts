export default {
    computed: {
        userInfo() {
            try {
                return JSON.parse(window.localStorage.getItem('web_oa_userInfor'));
            } catch (error) {
                return null
            }
        }
    }
}
