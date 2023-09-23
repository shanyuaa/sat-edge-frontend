<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%; display: flex;">
                <div style="margin-top: -5px;">
                    <el-button icon="el-icon-back" plain @click="goBack"></el-button>
                </div>
                <div style="margin-top: 10px; margin-left: 20px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/pod' }">Pod容器管理</el-breadcrumb-item>
                        <el-breadcrumb-item>创建Pod容器</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-header>
        </el-container>
        <div class="interface">
            <el-card class="add-node">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="任务名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="命名空间">
                        <el-input v-model="form.namespace"></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="标签">
                        <el-input v-model="form.labels"></el-input>
                    </el-form-item> -->
                    <el-form-item label="镜像">
                        <el-input v-model="form.image_name"></el-input>
                    </el-form-item>
                    <el-form-item label="镜像url">
                        <el-input v-model="form.image_url"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="SubmitCreatePod(form)">立即创建</el-button>
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
                namespace: '',
                labels:{},
                image_name:'',
                image_url: '',
            }
        }
    },
    methods:{
        goBack(){
            this.$router.push({
                name:'pod'
            })
        },
        SubmitCreatePod(form){
            var JsonData = JSON.stringify(form)
            console.log(JsonData)
            this.$http.post('/pod/create', form).then(res =>{
                console.log(res)
                if(res.data.status == '0'){
                    this.$message.success('添加成功')
                    this.form.name = '';
                    this.form.namespace = ''
                    this.form.labels = {}
                    this.form.image_name = ''
                    this.form.image_url = ''
                    this.$router.push({
                        name:'pod'
                    })
                }else if(res.data.status == '1'){
                    this.$message.error('添加失败')
                    this.form.name = '';
                    this.form.namespace = ''
                    this.form.labels = {}
                    this.form.image_name = ''
                    this.form.image_url = ''
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
.add-node{
  position: relative;
  width: 92%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
}


</style>