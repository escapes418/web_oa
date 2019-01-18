import { fromJS, Map, List } from 'immutable';
export default {
    created() {
        this.$$listQuery = Map();
        // '复制数据'
        if (this.$data && typeof this.$data.listQuery == 'object') {
            this.$$listQuery = fromJS(this.$data.listQuery);
        } else {
            console.log('$data中不存在listQuery对象！');
        }
        // this.$$blank=this.$$listQuery.clear();
        this.$$queryStub = this.$$listQuery;
    },
    methods: {
        // 重置方法
        restListQuery(cb) {
            if (this.$$listQuery.size > 0) {
                this.listQuery = this.$$listQuery.toJS();
            }
            if (cb) cb();
            /*
            重置时不改变缓存数据
            if (this.$$queryStub) {
                this.$$queryStub = Map(this.listQuery);
            } */
        }
    }
};
