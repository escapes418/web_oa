<template>
    <div>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <!-- <div style="text-align: center;margin-bottom: 20px;">{{"单据提交饼图"}}</div> -->
            <!-- <ve-pie :data="pieData"></ve-pie> -->
            <div style="text-align: center;margin-top: 20px;margin-bottom: 20px;">{{"单据审批趋势折线图"}}</div>
            <ve-line :data="chartData" :data-zoom="dataZoom" :dataEmpty="dataEmpty"></ve-line>
        </el-row>
    </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common';
import VePie from 'v-charts/lib/pie.common';
import 'echarts/lib/component/dataZoom';
import { getChartData} from '@/api/report'
import 'v-charts/lib/style.css'

export default {
    components: {
        VeLine,
        VePie
    },
    computed:{
    },
    data() {
        this.dataZoom = [
            {
                type: 'slider',
                start: 0,
                end: 20
            }
        ]
        return {
            chartData: {
                columns: ['日期', '报销','接待','出差','合同','平均时长'],
                rows: [
                    
                ]
            },
            dataEmpty:true,
            // pieData:{
            //     columns: ['当月单据类型', '访问用户'],
            //     rows: [
            //         { '当月单据类型': '报销', '访问用户': 1393 },
            //         { '当月单据类型': '接待', '访问用户': 3530 },
            //         { '当月单据类型': '出差', '访问用户': 2923 },
            //         { '当月单据类型': '合同', '访问用户': 1723 },
            //         { '当月单据类型': '协作', '访问用户': 3792 },
            //         { '当月单据类型': '报表', '访问用户': 4593 }
            //     ]
            // }
        };
    },
    created() {
        this.handleSetLineChartData()
    },
    mounted() {
        
    },
    methods: {
        handleSetLineChartData(){
            getChartData({}).then(res=>{
                res.data.forEach(item => {
                    this.chartData.rows.push({'日期':item.countDate,'报销':item.expenseAvgTime ,'接待':item.recpAvgTime,'出差':item.travelAvgTime,'合同':item.contractAvgTime,'平均时长':item.totalAvgTime})
                });
                this.dataEmpty = false 
            })
        },
        
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
     margin: 5px 0 0 0  
}

.item-value{
    display:inline-block;
    border: 1px solid #dcdfe6;
    border-radius:4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 250px
}

.ignore-detail {
    // overflow : hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-line-clamp: 1;
    // -webkit-box-orient: vertical;
    // word-break: break-all;
}
</style>