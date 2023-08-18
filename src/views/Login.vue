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
            <el-form-item label="用户名" style="margin-top: 40px; width: 350px; ">
                <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="margin-top: 50px; width: 350px;">
                <el-input v-model="password" type="password"></el-input>
            </el-form-item>
            <div style="display: flex; justify-content:center; align-items: center;">
                <el-button style="margin-top: 30px; width: 350px;" type="primary" @click="login()">登录</el-button>
            </div> 
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    data () {
      return {
        username:'',
        password:'',
        
      }
    },
    methods:{
        login(){
            sessionStorage.setItem('name', '123456')
        },
        clearSession(){
            sessionStorage.clear()
            this.$parent.ifLogin = false;
        },
        login(){
            if(this.username == 'admin' && this.password == 'admin'){
                this.resetSetItem('name', 'admin');  
                this.$parent.ifLogin = true
                this.$router.push({
                    name:'home'
                })
            }else{
                console.log('nono')
                this.$message.error('用户名或密码错误')
            }
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
    width:100%;
    height:100%;
    position:fixed;
    background-size:100% 100%;
  }

  .login_card{
    width:28%;
    margin-left: 55%;
    margin-top: 13%;
    height: 50%;
  }
  </style>