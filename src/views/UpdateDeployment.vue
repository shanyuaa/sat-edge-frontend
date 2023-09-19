<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%; display: flex;">
                <div style="margin-top: -5px;">
                    <el-button icon="el-icon-back" plain @click="goBack"></el-button>
                </div>
                <div style="margin-top: 10px; margin-left: 20px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/deployment' }">在线任务管理</el-breadcrumb-item>
                        <el-breadcrumb-item>修改在线任务</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-header>
        </el-container>
        <div class="interface">
            <el-card class="add-node">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="容器名称">
                        <el-input :disabled="true" :placeholder="name">{{ name }}</el-input>
                    </el-form-item>
                    <el-form-item label="副本数">
                        <el-input v-model="form.replicas"></el-input>
                    </el-form-item> 
                    <el-form-item label="镜像名称">
                        <el-input v-model="form.image_name"></el-input>
                    </el-form-item>
                    <el-form-item label="镜像url">
                        <el-input v-model="form.image_url"></el-input>
                    </el-form-item>
                    <el-form-item label="端口号">
                        <el-input v-model="form.ports"></el-input>
                    </el-form-item>
                   
                    <el-form-item>
                        <el-button type="primary" @click="SubmitUpdateDeployment(form)">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>

export default {
    props:['name','replicas','image_name','image_url'],
    data() {
        return{
            form: {
                
                replicas:this.replicas,
                image_name:this.image_name,
                image_url:this.image_url,
                ports:[]
            }
        }
    },
    methods:{
        goBack(){
            this.$router.push({
                name:'pod'
            })
        },
        SubmitUpdateDeployment(form){
            
            const arrObject = (form.ports.split(',')).map(str => parseInt(str))
           
            console.log(arrObject)
            let obj = {"name":this.name, "replicas":form.replicas, "image_name":form.image_name, "image_url":form.image_url, "ports":arrObject}
            this.$http.post('/deployment/update', obj).then(res =>{
                console.log(res)
                if(res.data.status == '0'){
                    this.$message.success('更改成功')
                    this.form.labels = '{}';
                   
                    this.$router.push({
                        name:'pod'
                    })
                }else if(res.data.status == '1'){
                    this.$message.error('更改失败')
                   
                    this.form.labels = '{}'
                    
                }
                
            })
        }
        
    },
    mounted(){
        console.log(this.replicas)
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
.add-node{
  position: relative;
  width: 92%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
}


</style>