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
                        <el-breadcrumb-item>GPU</el-breadcrumb-item>
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
                        <el-tab-pane label="进程信息" name="first">
                            <div style="left: 10px;">
                                <span>GPU进程列表</span>
                            </div>
                            <div style="display: flex; justify-content:space-around; margin-top: 20px;">
                                <el-table :data="GPU_data" stripe style="width: 100%">
                                    <el-table-column prop="command" label="命令" width="150px"></el-table-column>
                                    <el-table-column prop="container" label="容器" width="150px"></el-table-column>
                                    <el-table-column prop="cpu_mem" label="cpu_mem"  style="width: 100px;"></el-table-column>
                                    <el-table-column prop="job" label="job" width="100px"></el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="监控" name="second" style="justify-content: center;">
                            <div style="display:flex; justify-content: space-around;">
                                <div id="GPU_load_chart" style="width: 380px; height: 300px; margin-top: 40px; left: -10px;"></div>
                                <div id="GPU_temperature_chart" style="width: 380px; height: 300px; margin-top: 40px; "></div>
                            </div>
                            
                           

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
            GPU_data:[
            ],
            gpu_temperature:'',
            gpu_load:'',
            gpu_frequency_current:'',
            gpu_power_control_status:'',
            gpu_railgate_status:'',
            gpu_tpc_pg_mask_status:'',
            gpu_3d_scaling_status:'',
            process_info:[]
        }
    },
    methods:{
        get_npu_flash_id(){
            let api = 'http://192.168.13.148:30039/api/v1/query?query=npu_flash_id{NPU_ID=%22'+this.Npu_Id+'%22}'
            this.$http.get(api).then(res =>{
                this.Npu_flash_id = res.data.data.result[0].value[1]
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

        // TODO
    
        get_gpu_process_info(){

        },
        
        drawChart_temperature(){
            let newPromise = new Promise((resolve) => {
                resolve()
                })
            newPromise.then(() => {
                // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
                let myChart = this.$echarts.init(document.getElementById("GPU_temperature_chart"));
                let option = {
                title: {
                    text: "GPU温度",
                    left: 'center',
                    top: '0px'
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
                        value: this.Gpu_temperature
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
        drawChart_load(){
            let newPromise = new Promise((resolve) => {
                resolve()
                })
            newPromise.then(() => {
                // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
                let myChart = this.$echarts.init(document.getElementById("GPU_load_chart"));
                let option = {
                title: {
                    text: "GPU负载百分比",
                    left: 'center',
                    top: '0px',
                    bottom: '10px'
                },
                series: [
                    {
                    type: 'gauge',
                    progress: {
                        show: true,
                        width: 10
                    },
                    axisLine: {
                        lineStyle: {
                        width: 10
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        length: 10,
                        lineStyle: {
                        width: 2,
                        color: '#999'
                        }
                    },
                    axisLabel: {
                        distance: 15,
                        color: '#999',
                        fontSize: 10
                    },
                    anchor: {
                        show: true,
                        showAbove: true,
                        size: 10,
                        itemStyle: {
                        borderWidth: 10
                        }
                    },
                    title: {
                        show: true
                    },
                    detail: {
                        valueAnimation: true,
                        fontSize: 20,
                        offsetCenter: [0, '70%']
                    },
                    data: [
                        {
                        value: this.GPU_load
                        }
                    ]
                    }
                ]
                }
                myChart.setOption(option);
            })
        },
        
    },
    mounted() {
        setTimeout(() =>{
            // this.drawChart_nodes();
            this.drawChart_load();
            this.drawChart_temperature();
        },1000);
        // this.timer_temperature = setInterval(this.get_npu_temperature, 15000);
        
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