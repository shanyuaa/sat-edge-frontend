<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%; display: flex;">
                <div style="margin-top: -5px;">
                    <el-button icon="el-icon-back" plain @click="goBack"></el-button>
                </div>
                <div style="margin-top: 10px; margin-left: 20px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/service' }">网络应用管理</el-breadcrumb-item>
                        <el-breadcrumb-item>创建网络应用</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-header>
        </el-container>
        <div class="interface">
            <el-card class="add-service">
                <el-form ref="form" :model="form" label-width="180px" style="text-align: center;">
                    <el-form-item label="任务名称">
                        <el-input v-model="form.name" style="width: 900px;"></el-input>
                    </el-form-item>
                    <el-form-item label="容器标签">
                        <el-input v-model="form.selector" style="width: 900px;"></el-input>
                    </el-form-item>
                    <el-form-item label="service端口号" >
                        <el-input v-model="form.ports[0].port" style="width: 900px;" placeholder="端口号范围30000-32767"></el-input>
                    </el-form-item>
                    <el-form-item label="容器端口号">
                        <el-input v-model="form.ports[0].target_port" style="width: 900px;" ></el-input>
                    </el-form-item>
                    <el-form-item label="协议">
                        <el-input v-model="form.ports[0].protocol" style="width: 900px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="SubmitCreateService(form)">立即创建</el-button>
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
                name: '',
                selector:'',
                ports:[
                    {
                        port:'',
                        target_port:'',
                        protocol:''
                    }
                ]
            }
        }
    },
    methods:{
        goBack(){
            this.$router.push({
                name:'service'
            })
        },
        SubmitCreateService(form){
            var JsonData = JSON.stringify(form)
            this.form.ports[0].port = parseInt(this.form.ports[0].port)
            this.form.ports[0].target_port = parseInt(this.form.ports[0].target_port)
            console.log(JsonData)
            this.$http.post('/service/create', form).then(res =>{
                console.log(res)
                if(res.data.status == '0'){
                    this.$message.success('添加成功')
                    this.form.name = '';
                    this.form.selector = ''
                    this.form.ports[0].port = ''
                    this.form.ports[0].target_port = ''
                    this.form.ports[0].protocol = ''
                    this.$router.push({
                        name:'service'
                    })
                }else if(res.data.status == '1'){
                    this.$message.error('添加失败')
                    this.form.name = '';
                    this.form.selector = ''
                    this.form.ports[0].port = ''
                    this.form.ports[0].target_port = ''
                    this.form.ports[0].protocol = ''
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
.add-service{
  position: relative;
  width: 92%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
}


</style>