<template>
    <tr>
        <td style="padding: 0 10px 0 10px;">
            <el-checkbox v-model="itemData.checked"></el-checkbox>
        </td>
        <td style="padding: 0 10px 0 10px;">
            <el-input auto-complete="off" v-model.trim="itemData.nodeName" :maxlength="200"></el-input>
        </td>
        <td style="padding: 0 10px 0 10px;">
            <div class="map-value" @click="showMap(itemData)">
                <i class="el-icon-search" style="color:#bfbfbf;float:left;line-height:30px;"></i>
                <span style="color:#606266;line-height:30px;font-size:12px">{{itemData.nodeAddress}}</span>
            </div>
        </td>
        <el-dialog :visible.sync="dialogMap" width="30%" title="选择地图" style="height:100%">
            <div class="detailCollectionImgs">
                <el-amap-search-box class="search-box" :on-search-result="onSearchResult"></el-amap-search-box>
                <el-amap :vid="itemData.uid" ref="map" :center="mapCenter" :zoom="12" class="amap-con" :events="mapEvent">
                    <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :events="marker.events" :key="index"></el-amap-marker>
                    <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
                </el-amap>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMap = false">取消</el-button>
                <el-button type="primary" @click="selectAddress">确认</el-button>
            </div>
        </el-dialog>
    </tr>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Vue from 'vue';
import VueAMap from 'vue-amap';


Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: 'dc6f7d81b97b1e3f13fe76a55949a503',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch','AMap.Geocoder','AMap.Geolocation']
});
export default {
    props: {
        itemData: Object,
    },
    data() {
        let self = this;
        return {
            dialogMap:false,
            mapCenter:[114.42158, 30.4549],
            mapEvent:{
                init:(o)=>{
                    self.getCurrent().then(()=>{
                        self.$nextTick();
                        if(self.itemData.lng&&self.itemData.lat){
                            self.markers.push({
                                position:[self.itemData.lng,self.itemData.lat]
                            })
                            self.mapCenter = [self.itemData.lng,self.itemData.lat];
                        }
                    })
                },
                'click': async (e) => {
                    self.markers = []
                    self.markers.push({
                        position:[e.lnglat.lng, e.lnglat.lat],
                    });
                    let res = await self.getAddress([e.lnglat.lng, e.lnglat.lat]);
                    e.lnglat.formattedAddress = res.regeocode.formattedAddress;
                    self.position = e.lnglat;
                    this.mapCenter = [e.lnglat.lng, e.lnglat.lat];
                }
            },
            markers: [],
            windows: [],
            window: '',
            position:{},
        }
    },
    computed: {
        
    },
    created() {
       
    },
    methods: {
        showMap(itemData){
            this.dialogMap = true;
        },
        onSearchResult(pois){
            let latSum = 0;
            let lngSum = 0;
            let self = this;
            let windows = [];
            if (pois.length > 0) {
                pois.forEach((poi,index) => {
                    let {lng, lat} = poi;
                    lngSum += lng;
                    latSum += lat;
                    this.markers.push({
                        position:[poi.lng, poi.lat],
                        events:{
                            async click(){
                                self.windows.forEach(window => {
                                    window.visible = false;
                                });
                                self.window = self.windows[index];
                                self.$nextTick(() => {
                                    self.window.visible = true;
                                });
                                let res = await self.getAddress([poi.lng, poi.lat]);
                                poi.formattedAddress = res.regeocode.formattedAddress;
                                self.position = poi;
                            }
                        }
                    });
                    windows.push({
                        position: [poi.lng, poi.lat],
                        content: `<div class="prompt">${ poi.name }</div>`,
                        visible: false
                    });
                    this.windows = windows;
                    let center = {
                        lng: lngSum / pois.length,
                        lat: latSum / pois.length
                    };
                    this.mapCenter = [center.lng, center.lat];
                })
            }
        },
        selectAddress(){
            if(this.position.formattedAddress){
                this.itemData.nodeAddress = this.position.formattedAddress;
                this.itemData.lat = this.position.lat;
                this.itemData.lng = this.position.lng;
                this.dialogMap = false;
            }
        },
        getAddress(lnglat){
            return new Promise((resolve,reject)=>{
                var geocoder = new AMap.Geocoder()  
                geocoder.getAddress(lnglat, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        // result为对应的地理位置详细信
                        resolve(result)
                    }
                })
            })
        },
        getCurrent(){
            return new Promise((resolve,reject)=>{
                let geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,     
                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: 'RB'
                })

                geolocation.getCurrentPosition((status, result) => {
                    console.log(result)
                    if (result && result.position) {
                        self.mapCenter = [result.position.lng, result.position.lat];
                    }
                });
                resolve()
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
}
.editor-slide-upload{
    margin-bottom: 10px;
    margin-left: 10px
}
.foot-btn{
    margin-left: 80%
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.detailCollectionImgs{
    width:100%;
    height: 450px;
    margin-bottom: 15px;
}

.map-value {
    margin-top: 6px;
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    width: 450px;
    overflow:hidden;
}

</style>
