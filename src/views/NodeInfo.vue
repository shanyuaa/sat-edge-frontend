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
                        <el-breadcrumb-item>test1</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-header>
        </el-container>
        <div class="interface">
            <el-card class="NodeInfoCard1">
                <el-descriptions title="节点信息">
                <el-descriptions-item label="名称">test1</el-descriptions-item>
                <el-descriptions-item label="应用数量">0</el-descriptions-item>
                <el-descriptions-item label="状态">
                    <el-tag size="small">-</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="创建时间">2023-07-24 15:30:15</el-descriptions-item>
                <el-descriptions-item label="主机IP">-</el-descriptions-item>
                <el-descriptions-item label="CPU架构">x86_64</el-descriptions-item>
                <el-descriptions-item label="节点id">-</el-descriptions-item>
                <el-descriptions-item label="描述">-</el-descriptions-item>
                
            </el-descriptions>
            <div>
                <el-button size="mini" type="text" @click="gotoNodeLog()">查看节点日志</el-button>
            </div>
            </el-card>
            <el-card class="NodeInfoCard2">
                <template>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="任务" name="first">{{ this.CpuSeconds }}</el-tab-pane>
                        <el-tab-pane label="监控" name="second">
                            <div style="margin-top: 5px;">
                                <el-select v-model="select_node" slot="prepend" placeholder="请选择" style="width: 150px; margin-top: -5px; margin-right: -50px;">
                                    <el-option label="CPU利用率" value="1"></el-option>
                                    <el-option label="内存利用率" value="2"></el-option>
                                    <el-option label="GPU利用率" value="3"></el-option>
                                </el-select>
                            </div>
                            <div id="nodeinfo_monitor" style="width: 1200px; height: 300px"></div>

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

            }
        }
    },
    methods:{
        getCpuSeconds(){
            this.$http.get('http://192.168.13.134:30389/api/v1/query?query=node_cpu_seconds_total{node=%22k3s-master%22,mode!=%22idle%22}').then(res => {
                console.log(res)
                this.CpuSeconds = res.data.data.result
                console.log(this.CpuSeconds)
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
        drawChart_nodes(){
            let newPromise = new Promise((resolve) => {
                resolve()
            })
            newPromise.then(() => {
                // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
                let myChart = this.$echarts.init(document.getElementById("nodeinfo_monitor"));
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
                    name:'时间',
                    data: ["00:00", "4:00", "8:00", "12:00", "16:00","20:00"],
                },
                yAxis: [{
                    name:'利用率',
                    // min:0,
                    // max:100
                }],
                series: [
                    {
                    name: "CPU利用率",
                    type: "bar",
                    data: [5, 20, 36, 10, 10, 20, 47],
                    },
                    {
                    name: "内存利用率",
                    type: "line",
                    data: [20,34,47,14,24,39]
                    }
                ],
                };
                myChart.setOption(option);
            })
        },
        
    },
    mounted() {
        this.drawChart_nodes();
        this.getCpuSeconds();
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