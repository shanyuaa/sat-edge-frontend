<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%; display: flex;">
                <div style="margin-top: -5px;">
                    <el-button icon="el-icon-back" plain @click="goBack"></el-button>
                </div>
                <div style="margin-top: 10px; margin-left: 20px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/pod' }">容器管理</el-breadcrumb-item>
                        <el-breadcrumb-item>创建容器</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-header>
        </el-container>
        <div class="interface">
            <el-card class="add-node">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="容器名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="命名空间">
                        <el-input v-model="form.namespace"></el-input>
                    </el-form-item> -->
                    <el-form-item label="标签">
                        <el-input v-model="form.labels" placeholder="请输入 {'xxx':'xxx'} 格式数据"></el-input>
                    </el-form-item>
                    <el-form-item label="镜像">
                        <el-autocomplete
                        class="inline-input"
                        v-model="form.image_name"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        ></el-autocomplete>
                        <!-- <el-input v-model="form.image_name"></el-input> -->
                    </el-form-item>
                    <!-- <el-form-item label="镜像url">
                        <el-input v-model="form.image_url"></el-input>
                    </el-form-item> -->
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
                labels:'',
                image_name:'',
               
                
            },
            images:[]
        }
    },
    methods:{
        handleSelect(item) {
        this.form.image_name = item.value;
      },
        querySearch(queryString, cb) {
        var images = this.images;
        var results = queryString ? images.filter(this.createFilter(queryString)) : images;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (images) => {
          return (images.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll(){
        return[
            {"value":"hw-py"},
            {"value":"fe"},
            {"value":"pi"},
            {"value":"nginx"}
        ]
      },
        goBack(){
            this.$router.push({
                name:'pod'
            })
        },
        SubmitCreatePod(form){
            console.log(form.image_name)
            console.log(form.labels)
            const label = JSON.parse(form.labels)
            var JsonData = JSON.stringify(form)
            console.log(JsonData)
            let obj = {"name":form.name,"labels":label,"image_name":form.image_name, "ports":[5000]}
            this.$http.post('/pod/create', obj).then(res =>{
                console.log(res)
                if(res.data.status == '0'){
                    this.$message.success('添加成功')
                    this.form.name = '';
                    this.form.namespace = ''
                    this.form.labels = ''
                    this.form.image_name = ''
                    
                    this.$router.push({
                        name:'pod'
                    })
                }else if(res.data.status == '1'){
                    this.$message.error('添加失败')
                    this.form.name = '';
                    this.form.namespace = ''
                    this.form.labels = ''
                    this.form.image_name = ''
                    
                }
                
            })
        }
        
    },
    mounted(){
        this.images = this.loadAll()
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