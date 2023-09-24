<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">镜像管理</el-header>
        </el-container>
        <div class="interface">
            <el-card class="job-list" style="display: inline-block;">
                <div class="wrapper">

                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddImage">拉取镜像</el-button>
                    <!-- <el-input v-model="SearchNode" placeholder="按名称搜索" style="width: 400px;">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input> -->
                </div>
                <div class="table">
                    <el-table :data="displayedData" stripe style="width: 100%">
                        <!-- <el-table-column prop="name" label="Name" width="300px">
                            <template slot-scope="scope">
                                <el-button size="medium" type="text" @click="gotoNode(tableData[0].name)">{{ tableData[0].name }}</el-button>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="tag" label="镜像标签" width="200px"></el-table-column>
                        <el-table-column prop="id" label="镜像ID" width="700px"></el-table-column>
                        <el-table-column prop="size" label="镜像大小"  ></el-table-column>
                        <el-table-column prop="created" label="创建时间" width="200px"></el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <el-button v-if="role" size="mini" type="text" @click="DeleteImage(scope.row.tag)">删除</el-button>
                                <el-button v-if="!role" size="mini" type="text" @click="DeleteImage(scope.row.tag)" disabled>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="datasize">
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            role:false,
            displayedData:[], //当页展示的数据
            pageSize:10,
            currentPage1:1, //当前页码
            datasize:0,
            tableData: [

            ]
        }
    },
    methods:{
        IsAdmin(){
            this.role = sessionStorage.getItem('role')=='admin' ? true:false
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.updateDisplayedData(); // 重新加载数据
        },
        handleCurrentChange(val) {
            this.currentPage1 = val;
            this.updateDisplayedData(); // 重新加载数据
        },
        updateDisplayedData(){
            const startIndex = (this.currentPage1 - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            this.displayedData = this.tableData.slice(startIndex, endIndex);
        },
        getImageData(){
            this.$http.post('/image/info').then(res =>{
                console.log(res)
                this.tableData = res.data.data.images
                this.datasize = res.data.data.images.length
                this.updateDisplayedData()
            })
        },
        toAddImage(){
            this.$router.push({
                name:'addimage'
            })
        },
        DeleteImage(name){
            let obj = {"name":name}
            console.log(obj)
            this.$http.post('/image/delete', obj).then(res =>{
                console.log(res)
                if(res.data.status === 0){
                    this.$message.success('删除成功')
                    location.reload()
                }
            })
        }
    },
    mounted() {
        this.getImageData();
    },
    created(){
        this.IsAdmin()
    }
}
</script>

<style scoped>
.interface{
    height: 100%;
    background-color: #F2F6FC;
}

.job-list{
    position: relative;
  width: 96%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
  margin-bottom:5%;
  min-height: 800px;
}
.table{
    top:20px;
    margin-bottom: 40px;
    min-height: 600px;
}
.wrapper{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>