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
        <div style="display: flex; justify-content:space-around; margin-top: 20px;">
          <el-card>
            <div style="display: flex; justify-content: space-around; margin-top: 20px;" >
              <span style="margin-left: -30px;">节点资源监控Top5</span>
              <el-select v-model="select_node" slot="prepend" placeholder="请选择" style="width: 150px; margin-top: -5px; margin-right: -50px;">
                <el-option label="CPU利用率" value="1"></el-option>
                <el-option label="内存利用率" value="2"></el-option>
              </el-select>
            </div>
            <div id="nodes_monitor" style="width: 400px; height: 250px"></div>
          </el-card>
          <el-card>
            <div style="display: flex; justify-content: space-around; margin-top: 20px;">
              <span style="margin-left: -30px;">系统平均负载监控</span>
              <!-- <el-select v-model="select_app" slot="prepend" placeholder="请选择" style="width: 150px; margin-top: -5px; margin-right: -50px;">
                <el-option label="节点1" value="1"></el-option>
                <el-option label="节点2" value="2"></el-option>
              </el-select> -->
            </div>
            <div id="apps_monitor" style="width: 400px; height: 250px">
              
            </div>
          </el-card>
        </div>
      </el-card>

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
          // src: 'https://ecloud.10086.cn/api/page/edge/img/edgeService.4d1bc8cb.svg'
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
          data:1
        },{
          name:"Job任务",
          data:1
        },{
          name:"Pod对象",
          data:1
        }
      ]
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
          // legend: {
          //   data: ["销量"],
          // },
          xAxis: {
            name:'节点',
            data: ["1", "2", "3", "4", "5"],
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
              data: [5, 20, 36, 10, 10, 20],
            },
            {
              name: "内存利用率",
              type: "line",
              data: [20,34,47,14,24]
            }
          ],
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
            data: ["17:20", "17:25", "17:30", "17:35", "17:40"],
          },
          yAxis: [
            {
              name:'平均负载',
              position: 'left',
              min:0,
              max:2
            }
            // {
            //   name:'内存使用量',
            //   position: 'right',
            //   min:0,
            //   max:16
            // }
          ],
          series: [
            {
              name: "节点1",
              type: "line",
              // yAxisIndex: 0,
              data: [0.4, 1, 1.2, 1.6, 2],
            },
            {
              name: "节点2",
              type:"line",
              // yAxisIndex: 1,
              data: [1,0.5,0.8,1.3,1.5]
            }
          ],
        };
        myChart.setOption(option);
      })
    }
  },
  mounted() {
    this.drawChart_nodes();
    this.drawChart_apps();
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

.text-item{
  width: 150px
}
</style>