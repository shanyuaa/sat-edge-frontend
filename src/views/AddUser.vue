<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%; display: flex;">
                <div style="margin-top: -5px;">
                    <el-button icon="el-icon-back" plain @click="goBack"></el-button>
                </div>
                <div style="margin-top: 10px; margin-left: 20px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
                        <el-breadcrumb-item>创建用户</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-header>
        </el-container>
        <div class="interface">
            <el-card class="add-job">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input  v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                       <el-radio-group v-model="form.role" >
                        <el-radio label="管理员"></el-radio>
                        <el-radio label="普通用户" ></el-radio>
                       </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="SubmitCreateUser(form)">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            form: {
                username: '',
                password:'',
                role:''
            }
        }
    },
    methods:{
        goBack(){
            this.$router.push({
                name:'user'
            })
        },
        SubmitCreateUser(form){
            var JsonData = JSON.stringify(form)
            console.log(JsonData)
            if(JsonData.type === "管理员"){
                form.role = 'admin'
            }else{
                form.role = 'guest'
            }
            console.log(JsonData)
            this.$http.post('/user/create', form).then(res =>{
                console.log(res)
                if(res.data.status == '0'){
                    this.$message.success('添加成功')
                    this.form.username = '';
                    this.form.password = ''
                    this.form.type = ''
                    this.$router.push({
                        name:'user'
                    })
                }else if(res.data.status == '1'){
                    this.$message.error('添加失败')
                    this.form.username = '';
                    this.form.password = ''
                    this.form.type = ''
                    
                }
                
            })
        }
        
    }
}
</script>

<style scoped>
.interface{
  height: 100%;
  background-color: #F2F6FC;
  position: fixed;
  width: 90%;
}
.add-job{
  position: relative;
  width: 92%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
}


</style>