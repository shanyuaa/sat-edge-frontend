<template>
  <div>
    <el-container>
      <div>
        <el-header style="height: 60px; padding: 15px; width: 100%;">概览</el-header>
      </div>
      <div style="left: 85%;margin-top: 5px;">
        <el-button icon="el-icon-switch-button" style="float: right;" type="text" @click="quit()"> 退出登录</el-button>
      </div>

    </el-container>
    <div class="interface">
      <el-card class="function-box" >
        <div slot="header" class="clearfix">
          <span>功能快速入口</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作指南</el-button>
        </div>
        <div style="display: flex; justify-content:space-around; ">

          <el-card v-for="item in functionlist" :key="item" class="text-item" shadow="hover">
            <div style="text-align: center;">
              <img :src="item.src" width="70px" >
            </div>
            <div style="text-align: center;">
              {{item.name}}
            </div>
          </el-card>
        </div>
      </el-card>

      <el-card class="resource-overview" >
        <div class="clearfix">
          <span>资源总览</span>
        </div>
        <el-card shadow="never" class="resource-inner">
          <div style="display:flex; justify-content: space-around;">
              <div v-for="item in resource_overview_list" :key="item" >
                <div style="font-size:medium; margin-left: -15px;">
                  {{ item.name }}
                </div>
                <div style="color: dodgerblue; font-size: 35px; margin-top: 5px;" >
                  {{item.data}}
                  <span style="font-size: small;">个</span>
                </div>
              </div>
          </div>
        </el-card>
      </el-card>

      <el-card class="resource-monitor">
        <div style="left: 10px;">
          <span>监控</span>
        </div>

          <div :gutter="20" style="display: flex; flex-wrap:wrap; margin-top: 20px; margin-left: 50px;" >

            <el-card style="margin: 20px;">
            <div style="display: flex; justify-content: space-around;  margin-top: 20px; " >
              <span style="margin-left: -30px;">节点资源监控</span>
              <el-select v-model="select_node" slot="prepend" placeholder="请选择" style="width: 150px; margin-top: -5px; margin-right: -50px;">
                <el-option label="CPU利用率" value="1"></el-option>
                <el-option label="内存利用率" value="2"></el-option>
                <el-option label="GPU利用率" value="3"></el-option>
              </el-select>
            </div>
            <div id="nodes_monitor" style="width: 380px; height: 250px"></div>
          </el-card>
          <el-card style="margin: 20px;">
            <div id="apps_monitor" style="width: 380px; height: 250px; margin-top: 40px; left: -10px;">
            </div>
          </el-card>
          <el-card style="margin: 20px;">
            <div id="GPU_temperature_chart" style="width: 380px; height: 250px; margin-top: 40px;">
            </div>
          </el-card>
          <!-- <el-card style="margin: 20px;">
            <div style="width: 550px; height: 250px; margin-top: 40px;">
              <el-descriptions title="其他信息">
                <el-descriptions-item label="gpu缩放状态">
                  <el-tag style="size:smaller"
                    :type="  gpu_3d_scaling_status   === '开启' ? 'success' : 'danger'"
                    disable-transitions>{{ gpu_3d_scaling_status }}</el-tag>
                  </el-descriptions-item>
                <el-descriptions-item label="当前频率"> {{ gpu_frequency_current }}</el-descriptions-item>
                <el-descriptions-item label="电源控制状态">{{ gpu_power_control_status }}</el-descriptions-item>
                <el-descriptions-item label="railgate状态">
                  <el-tag style="size:smaller"
                    :type=" gpu_railgate_status  === '开启' ? 'success' : 'danger'"
                    disable-transitions>{{ gpu_railgate_status }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="tpc pg mask状态">
                  <el-tag style="size:smaller"
                    :type=" gpu_tpc_pg_mask_statu  === '开启' ? 'success' : 'danger'"
                    disable-transitions>{{ gpu_tpc_pg_mask_status }}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>

          </el-card> -->

        </div>

      </el-card>

      <!-- <el-card class="gpu_list">
        <div style="left: 10px;">
          <span>GPU进程列表</span>
        </div>
        <div style="display: flex; justify-content:space-around; margin-top: 20px;">
          <el-table :data="GPU_data" stripe style="width: 100%">
              <el-table-column prop="PID" label="PID" width="150px"></el-table-column>
              <el-table-column prop="Name" label="名称" width="150px"></el-table-column>
              <el-table-column prop="Class" label="class"  style="width: 100px;"></el-table-column>
              <el-table-column prop="Status" label="状态" width="100px"></el-table-column>
              <el-table-column prop="Type" label="种类" width="100px"></el-table-column>
              <el-table-column prop="User" label="用户" width="100px"></el-table-column>
              <el-table-column prop="GPUUsage" label="GPU利用率" width="100px"></el-table-column>
              <el-table-column prop="Memory" label="内存" width="140px"></el-table-column>
              <el-table-column prop="ResidentMemory" label="可用内存" width="140px"></el-table-column>
              <el-table-column prop="Priority" label="优先级" width="140px"></el-table-column>
          </el-table>
        </div>
      </el-card> -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return{
      select_node:'',
      select_app:'',
      functionlist:[
        {
          name:"节点管理",
          src: require('../assets/addedge.png')
        },
        // {
        //   name:"注册边缘设备",
        //   src: require('../assets/createDevice.png')
        //   // src:"https://ecloud.10086.cn/api/page/edge/img/createDevice.9bd71976.svg"
        // },
        {
          name:"任务管理",
          src: require('../assets/createApp.png')
          // src:"https://ecloud.10086.cn/api/page/edge/img/createApp.8d1993fe.svg"
        },{
          name:"实时信息监控",
          src: require('../assets/mesConfig.png')
          // src:"	https://ecloud.10086.cn/api/page/edge/img/mesConfig.62060e0a.svg"
        }
      ],
      resource_overview_list:[{
          name:"边缘节点",
          data:4
        },{
          name:"Job任务",
          data:1
        },{
          name:"Pod对象",
          data:5
        }
      ],
      GPU_load:'',
      GPU_temperature:'',
      GPU_data:[


      ],
      gpu_3d_scaling_status:'',
      gpu_frequency_current:'',
      gpu_power_control_status:'',
      gpu_railgate_status:'',
      gpu_tpc_pg_mask_status:''
    }
  },
  methods:{
    quit(){
      sessionStorage.clear()
      this.$parent.ifLogin=false
      this.$router.push({
          name:'login'
      })
    },
    drawChart_nodes(){
      let newPromise = new Promise((resolve) => {
          resolve()
        })
      newPromise.then(() => {
         // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
        let myChart = this.$echarts.init(document.getElementById("nodes_monitor"));
        // 指定图表的配置项和数据
        let option = {
          // title: {
          //   text: "ECharts test",
          // },
          tooltip: {},
          // grid:{
          //   left: '0px',
          // },
          // legend: {
          //   data: ["销量"],
          // },
          xAxis: {
            name:'节点',
            data: ["1", "2", "3", "4"],
          },
          yAxis: [{
            name:'利用率',
            min:0,
            max:100
          }],
          series: [
            {
              name: "CPU利用率",
              type: "bar",
              data: [5, 20, 36, 10, 10],
            },
            {
              name: "内存利用率",
              type: "line",
              data: [20,34,47,14]
            }
          ]
        };
        myChart.setOption(option);
      })
    },
    drawChart_apps(){
      let newPromise = new Promise((resolve) => {
          resolve()
        })
      newPromise.then(() => {
         // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
        let myChart = this.$echarts.init(document.getElementById("apps_monitor"));
        let option = {
          title: {
            text: "XXX数据",
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
    drawChart_temperature(){
      let newPromise = new Promise((resolve) => {
          resolve()
        })
      newPromise.then(() => {
         // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
        let myChart = this.$echarts.init(document.getElementById("GPU_temperature_chart"));
        let option = {
          title: {
            text: "xxx数据",
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
                  value: this.GPU_temperature
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
    getGpuInfo(){
      this.GPU_data = [];
      this.$http.get('http://192.168.1.241:8000/data').then(res => {
        console.log(res.data.gpu_load)
        this.GPU_load = res.data.gpu_load
        this.GPU_temperature = res.data.gpu_temperature
        if(res.data.gpu_3d_scaling_status == 1){
          this.gpu_3d_scaling_status = '开启'
        }else{
          this.gpu_3d_scaling_status = '关闭'
        }
        this.gpu_frequency_current = res.data.gpu_frequency_current
        this.gpu_power_control_status = res.data.gpu_power_control_status
        if(res.data.gpu_railgate_status == 1){
          this.gpu_railgate_status = '开启'
        }else if(res.data.gpu_railgate_status == 0){
          this.gpu_railgate_status = '关闭'
        }else{
          this.gpu_railgate_status = '未知'
        }
        if(res.data.gpu_tpc_pg_mask_status == 1){
          this.gpu_tpc_pg_mask_status = '开启'
        }else{
          this.gpu_tpc_pg_mask_status = '关闭'
        }

        // console.log(this.GPU_data[0].PID+'hhh')
        for(var i=0 ; i<res.data.gpu_processes.length;i++){
          this.GPU_data.push({
            PID:res.data.gpu_processes[i][0],
            User:res.data.gpu_processes[i][1],
            Class:res.data.gpu_processes[i][2],
            Type:res.data.gpu_processes[i][3],
            Priority:res.data.gpu_processes[i][4],
            Status:res.data.gpu_processes[i][5],
            GPUUsage:res.data.gpu_processes[i][6],
            Memory:res.data.gpu_processes[i][7],
            ResidentMemory:res.data.gpu_processes[i][8],
            Name:res.data.gpu_processes[i][9]
          })
        }
        console.log(this.GPU_data)
      })
    },
    getGpuTemperature(){
      console.log('进来了')
      this.$http.get('http://192.168.1.241:8000/data').then(res =>{
        this.GPU_temperature = res.data.gpu_temperature
        console.log(this.GPU_temperature)
      })
    },
    getGpuLoad(){
      console.log('进来了')
      this.$http.get('http://192.168.1.241:8000/data').then(res =>{
        this.GPU_load = res.data.gpu_load
        console.log(this.GPU_load)
      })
    }
  },
  mounted() {
    this.getGpuInfo();
    console.log(this.GPU_load+'   1')
    setTimeout(() =>{
      console.log(this.GPU_load+'   2')
        // this.drawChart_nodes();
        this.drawChart_nodes();
        this.drawChart_apps();
        this.drawChart_temperature()
      },100);
    this.timer_temperature = setInterval(this.getGpuTemperature, 2000);
    this.timer_load = setInterval(this.getGpuLoad, 2000);

  },
  watch:{
      GPU_temperature:{
        handler(newVal){
          console.log(newVal);
          //如果监听到了status的变化，那么就重新更新拓扑图，更新状态
          // console.log(this.edgeStatus[2])
          this.drawChart_temperature()
        },
      },
      GPU_load:{
        handler(newVal){
          console.log(newVal);
          //如果监听到了status的变化，那么就重新更新拓扑图，更新状态
          // console.log(this.edgeStatus[2])
          this.drawChart_apps()
        },
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
    color: #333;
  }

.clearfix{
  position: relative;
  margin-top: -10px;
  font-size: medium
}
.interface{
  height: 100%;
  background-color: #F2F6FC;
}

.function-box{
  position: relative;
  width: 96%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
}

.resource-overview{
  position: relative;
  width: 96%;
  padding: 10px;
  margin-top:60px;
  left:2%;
  right: 2%;
}
.resource-inner{
  position: relative;
  width: 96%;
  padding: 0px;
  margin-bottom: 10px;
  top:20px;
  left:2%;
  right: 2%;
}

.resource-monitor{
  position: relative;
  width: 96%;
  padding: 0px;
  margin-top:50px;
  bottom: 20px;
  left:2%;
  right: 2%;
}

.gpu_list{
  position: relative;
  width: 96%;
  padding: 0px;
  margin-top:50px;
  bottom: 20px;
  left:2%;
  right: 2%;
}

.text-item{
  width: 150px
}
</style>
