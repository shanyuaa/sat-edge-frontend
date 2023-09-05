<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%; display: flex;">
                <div style="margin-top: -5px;">
                    <el-button icon="el-icon-back" plain @click="goBack"></el-button>
                </div>
                <div style="margin-top: 10px; margin-left: 20px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/node' }">节点</el-breadcrumb-item>
                        <el-breadcrumb-item>NPU</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-header>
        </el-container>
        <div class="interface">
            <el-card class="NodeInfoCard1">
                <el-descriptions title="节点信息">
                <el-descriptions-item label="芯片ID">{{Npu_chip_id}}</el-descriptions-item>
                <el-descriptions-item label="闪存ID">{{ Npu_flash_id }}</el-descriptions-item>
                <el-descriptions-item label="闪存容量">{{ Npu_flash_capacity }}</el-descriptions-item>
                <el-descriptions-item label="状态">
                    <el-tag size="small">-</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="内存容量">{{Npu_memory_capacity}}</el-descriptions-item>
                <el-descriptions-item label="时钟速度">{{Npu_clock_speed}} Mhz</el-descriptions-item>
                <el-descriptions-item label="大页总数">{{Npu_hugepages_total}}</el-descriptions-item>
                <el-descriptions-item label="额定功率">{{Npu_power_dissipation}} W</el-descriptions-item>
                
            </el-descriptions>
            <div>
                <el-button size="mini" type="text" @click="gotoNodeLog()">查看节点日志</el-button>
            </div>
            </el-card>
            <el-card class="NodeInfoCard2">
                <template>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="利用率" name="first">
                            <div id="usage_monitor" style="width: 1250px; height: 300px"></div>
                        </el-tab-pane>
                        <el-tab-pane label="温度" name="second" style="justify-content: center;">
                            <!-- <div style="margin-top: 5px;">
                                <el-select v-model="select_node" slot="prepend" placeholder="请选择" style="width: 150px; margin-top: -5px; margin-right: -50px;">
                                    <el-option label="CPU利用率" value="1"></el-option>
                                    <el-option label="内存利用率" value="2"></el-option>
                                    <el-option label="GPU利用率" value="3"></el-option>
                                </el-select>
                            </div> -->
                            <div style="display:flex; justify-content: space-around;">
                                <div id="NPU_temperature_chart" style="width: 380px; height: 250px; margin-top: 40px; "></div>
                            </div>
                            
                            <!-- <div id="nodeinfo_monitor" style="width: 1200px; height: 300px"></div> -->

                        </el-tab-pane>
                        <!-- <el-tab-pane label="设备" name="third">设备</el-tab-pane> -->
                    </el-tabs>
                </template>
            </el-card>
            
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return{
            activeName: 'first',
            select_node:'',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            CpuSeconds:{

            },
            Npu_Id:0,
            Npu_chip_Id:'0',
            Npu_flash_id:'',
            Npu_flash_capacity:'',
            Npu_memory_capacity:'',
            Npu_clock_speed:'',
            Npu_hugepages_total:'',
            Npu_memory_usage_rate:'',
            Npu_hugepages_usage_rate:'',
            Npu_aicore_usage_rate:'',
            Npu_aicpu_usage_rate:'',
            Npu_ctrlcpu_usage_rate:'',
            Npu_memory_bandwidth_usage_rate:'',
            Npu_temperature:'',
            Npu_power_dissipation:''
        }
    },
    methods:{
        get_npu_flash_id(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_flash_id{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_flash_id = res.data.data.result[0].value[1]
            })
        },
        get_npu_chip_id(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_chip_id{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_chip_id = res.data.data.result[0].value[1]
            })
        },
        get_npu_flash_capacity(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_flash_capacity{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_flash_capacity = res.data.data.result[0].value[1]
            })
        },
        get_npu_memory_capacity(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_memory_capacity{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_memory_capacity = res.data.data.result[0].value[1]
            })
        },
        get_npu_clock_speed(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_clock_speed{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_clock_speed = res.data.data.result[0].value[1]
            })
        },
        get_npu_hugepages_total(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_hugepages_total{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_hugepages_total = res.data.data.result[0].value[1]
                console.log(this.Npu_hugepages_total)
            })
        },
        get_npu_power_dissipation(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_power_dissipation{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_power_dissipation = res.data.data.result[0].value[1]
            })
        },

        get_npu_memory_usage_rate(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_memory_usage_rate{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_memory_usage_rate = res.data.data.result[0].value[1]
            })
        },
        get_npu_hugepages_usage_rate(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_hugepages_usage_rate{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_hugepages_usage_rate = res.data.data.result[0].value[1]
                
            })
        },
        get_npu_aicore_usage_rate(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_aicore_usage_rate{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_aicore_usage_rate = res.data.data.result[0].value[1]
                console.log(this.Npu_aicore_usage_rate)
            })
        },
        get_npu_aicpu_usage_rate(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_aicpu_usage_rate{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_aicpu_usage_rate = res.data.data.result[0].value[1]
            })
        },
        get_npu_ctrlcpu_usage_rate(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_ctrlcpu_usage_rate{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_ctrlcpu_usage_rate = res.data.data.result[0].value[1]
            })
        },
        get_npu_memory_bandwidth_usage_rate(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_memory_bandwidth_usage_rate{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_memory_bandwidth_usage_rate = res.data.data.result[0].value[1]
            })
        },
        get_npu_temperature(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_temperature{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_temperature = res.data.data.result[0].value[1]
            })
        },

        
        goBack(){
            this.$router.push({
                name:'node'
            })
        },
        gotoNodeLog(){
            this.$router.push({
                name: ''
            })
        },
        drawChart_usage(){
            let newPromise = new Promise((resolve) => {
                resolve()
            })
            newPromise.then(() => {
                // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
                let myChart = this.$echarts.init(document.getElementById("usage_monitor"));
                // 指定图表的配置项和数据
                let option = {
                // title: {
                //   text: "ECharts test",
                // },
                tooltip: {},
                // legend: {
                //   data: ["销量"],
                // },
                xAxis: {
                    name:'数据类别',
                    data: ["内存", "大页", "Aicore", "Aicpu", "Ctrlcpu","内存带宽"],
                },
                yAxis: [{
                    name:'利用率(%)',
                    // min:0,
                    // max:100
                }],
                series: [
                    {
                        name: "利用率",
                        type: "bar",
                        data: [this.Npu_memory_usage_rate, this.Npu_hugepages_usage_rate, this.Npu_aicore_usage_rate, this.Npu_aicpu_usage_rate, this.Npu_ctrlcpu_usage_rate, this.Npu_memory_bandwidth_usage_rate],
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }        
                    }, 
                ],
                };
                myChart.setOption(option);
            })
        },
        drawChart_temperature(){
            let newPromise = new Promise((resolve) => {
                resolve()
                })
            newPromise.then(() => {
                // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
                let myChart = this.$echarts.init(document.getElementById("NPU_temperature_chart"));
                let option = {
                title: {
                    text: "NPU温度",
                    left: 'center',
                    top: '-5px'
                },
                series: [
                    {
                    type: 'gauge',
                    center: ['50%', '60%'],
                    startAngle: 200,
                    endAngle: -20,
                    min: 0,
                    max: 60,
                    splitNumber: 12,
                    itemStyle: {
                        color: '#FFAB91'
                    },
                    progress: {
                        show: true,
                        width: 30
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                        width: 30
                        }
                    },
                    axisTick: {
                        distance: -45,
                        splitNumber: 5,
                        lineStyle: {
                        width: 2,
                        color: '#999'
                        }
                    },
                    splitLine: {
                        distance: -52,
                        length: 14,
                        lineStyle: {
                        width: 3,
                        color: '#999'
                        }
                    },
                    axisLabel: {
                        distance: 5,
                        color: '#999',
                        fontSize: 10
                    },
                    anchor: {
                        show: false
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        valueAnimation: true,
                        width: '60%',
                        lineHeight: 40,
                        borderRadius: 8,
                        offsetCenter: [0, '-15%'],
                        fontSize: 20,
                        fontWeight: 'bolder',
                        formatter: '{value} °C',
                        color: 'inherit'
                    },
                    data: [
                        {
                        value: this.Npu_temperature
                        }
                    ]
                    },
                ]
                };
                // setInterval(function () {
                //   this.getGpuTemperature;

                //   myChart.setOption({
                //     series: [
                //       {
                //         data: [
                //           {
                //             value: this.GPU_temperature
                //           }
                //         ]
                //       }
                //     ]
                //   });
                // }, 2000);
                option && myChart.setOption(option);
            })
        },
        
    },
    mounted() {
        this.get_npu_flash_id();
        this.get_npu_chip_id();
        this.get_npu_flash_capacity();
        this.get_npu_memory_capacity();
        this.get_npu_clock_speed();
        this.get_npu_hugepages_total();
        this.get_npu_power_dissipation();
        this.get_npu_memory_usage_rate();
        this.get_npu_hugepages_usage_rate();
        this.get_npu_aicore_usage_rate();
        this.get_npu_aicpu_usage_rate();
        this.get_npu_memory_bandwidth_usage_rate();
        this.get_npu_temperature();
        setTimeout(() =>{
            // this.drawChart_nodes();
            this.drawChart_usage();
            this.drawChart_temperature();
        },1000);
        this.timer_temperature = setInterval(this.get_npu_temperature, 15000);
        
    }
}
</script>

<style scoped>
.interface{
  height: 100%;
  background-color: #F2F6FC;
  position: fixed;
  overflow: auto;
  width: 100%;
}
.NodeInfoCard1{
  /* position: relative; */
  width: 84%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
}

.NodeInfoCard2{
    position: relative;
    width: 84%;
    height: 50%;
    padding: 10px;
    margin-top:60px;
    left:2%;
    right: 2%;
}


</style>