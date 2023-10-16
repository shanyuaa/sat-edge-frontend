<template>
    <div class="background">
      <!-- <div style="margin-top: 20px;">
        <el-button type="" @click="login()">登录</el-button>
      </div> -->
      <el-card class="login_card">
        <div style="margin-top:20px ">
            <span style=" font-size: 23px; font-weight: 1500; font-style: normal; color:darkblue ;">账号登录</span>
        </div>
        <!-- <div style="margin-left: 20px;">
            用户名：
            <el-input style="margin-top: 30px; width: 200px;" v-model="username" placeholder="请输入用户名"></el-input>
        </div>
        <div style="margin-left: 20px;">
            密码：
            <el-input style="margin-top: 30px; width: 200px;" placeholder="请输入密码" v-model="password" show-password></el-input>
        </div>
        <div>
            <el-button style="margin-top: 30px; left: 65%;" type="primary">主要按钮</el-button>
        </div> -->
        <el-form label-position="left" label-width="80px" style="margin-top:30px; ">
            <el-form-item :model=user label="用户名" style="margin-top: 40px; width: 350px; ">
                <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="margin-top: 50px; width: 350px;">
                <el-input v-model="user.password" type="password"></el-input>
            </el-form-item>
            <div style="display: flex; justify-content:center; align-items: center;">
                <el-button style="margin-top: 30px; width: 350px;" type="primary" @click="login(user)">登录</el-button>
            </div> 
        </el-form>
      </el-card>

      <!-- TODO -->
      <el-card class="NodeInfoCard-BMC">
                <el-descriptions title="节点BMC信息">
                <el-descriptions-item label="名称"></el-descriptions-item>
                <el-descriptions-item label="主机IP"></el-descriptions-item>
                <el-descriptions-item label="CPU架构"></el-descriptions-item>
                <el-descriptions-item label="创建时间"></el-descriptions-item>
                <el-descriptions-item label="操作系统"></el-descriptions-item>
                <el-descriptions-item label="内存总量"></el-descriptions-item>
                <el-descriptions-item label="内存使用量"></el-descriptions-item>
                <el-descriptions-item label="内存使用率"></el-descriptions-item>
                <el-descriptions-item label="磁盘总量"></el-descriptions-item>
                <el-descriptions-item label="磁盘剩余量"></el-descriptions-item>
                <el-descriptions-item label="磁盘使用率"></el-descriptions-item>
                <el-descriptions-item label="CPU使用率"></el-descriptions-item>

                
                <!-- <el-descriptions-item label="GPU" v-if="nodeInfo.gpu">
                    <el-tag style="size:smaller"
                    :type=" nodeInfo.gpu  ? 'success' : 'danger'"
                    disable-transitions>{{ nodeInfo.gpu ? '√': '×' }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="NPU" v-if="nodeInfo.npu">
                    <el-tag style="size:smaller"
                    :type=" nodeInfo.npu  ? 'success' : 'danger'"
                    disable-transitions>{{ nodeInfo.npu ? '√':'×'}}</el-tag>
                </el-descriptions-item> -->
                
            </el-descriptions>
            <div>
                <!-- <el-button size="mini" type="text" @click="gotoNodeLog()">查看节点日志</el-button> -->
            </div>
            </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    data () {
      return {
        user:{
          username:'',
          password:'',
        }
      }
    },
    methods:{
        // login(){
        //     sessionStorage.setItem('name', '123456')
        // },
        clearSession(){
            sessionStorage.clear()
            this.$parent.ifLogin = false;
        },
        login(user){
          this.$http.post('/user/login',user).then(res =>{
            if(res.data.status == 0){
              this.$message.success('登录成功')
              sessionStorage.setItem('name', res.data.data.token)
              sessionStorage.setItem('role', res.data.data.role)
              // this.resetSetItem('name', 'admin');  
                this.$parent.ifLogin = true
                this.$router.push({
                    name:'home'
                })
            }else{
                this.$message.error('用户名或密码错误')
            }
          })
        }
    },
    mounted() {
        this.clearSession();
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .background{
    background: url(../assets/background_login.png);
    height: 100%;
  
    position: fixed;
    overflow: auto;
    width: 100%;
    background-size:100% 100%;
  }

  .NodeInfoCard1{
  /* position: relative; */
  width: 84%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
  margin-bottom:5%;
}

  .login_card{
    width:28%;
    margin-left: 55%;
    margin-top: 13%;
    height: 50%;
  }
  </style>