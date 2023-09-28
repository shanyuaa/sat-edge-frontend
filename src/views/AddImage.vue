<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%; display: flex;">
                <div style="margin-top: -5px;">
                    <el-button icon="el-icon-back" plain @click="goBack"></el-button>
                </div>
                <div style="margin-top: 10px; margin-left: 20px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/image' }">镜像管理</el-breadcrumb-item>
                        <el-breadcrumb-item>创建镜像</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-header>
        </el-container>
        <div class="interface">
            <el-card class="add-job">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="镜像名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Dockerfile">
                        <el-input type="textarea" v-model="form.dockerfile"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="SubmitCreateImage(form)">立即创建</el-button>
                        
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
                dockerfile:''
            }
        }
    },
    methods:{
        goBack(){
            this.$router.push({
                name:'image'
            })
        },
        SubmitCreateImage(form){
            var JsonData = JSON.stringify(form)
           
            console.log(JsonData)
            this.$http.post('/image/create', form).then(res =>{
                console.log(res)
                if(res.data.status == '0'){
                    this.$message.success('添加成功')
                    this.form.name = '';
                    this.form.dockerfile = ''
                    
                    this.$router.push({
                        name:'image'
                    })
                }else if(res.data.status == '1'){
                    this.$message.error('添加失败')
                    this.form.name = '';
                    this.form.dockerfile = ''
                    
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