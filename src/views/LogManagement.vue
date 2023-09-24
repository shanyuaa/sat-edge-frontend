<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">日志管理</el-header>
        </el-container>
        <div class="interface">
            <el-card class="user-list" style="display: inline-block;">
                <div class="wrapper">
                    
                </div>
                <div class="table">
                    <el-table :data="displayedData" stripe style="width: 100%">
                        
                        <el-table-column prop="route" label="访问记录" ></el-table-column>
                        <el-table-column prop="time" label="生成时间" ></el-table-column>
                        
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
            tableData: []
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
        getAllLogs(){
            this.$http.post('/log/info').then(res =>{
                this.tableData = res.data.data
                this.datasize = res.data.data.length
                this.updateDisplayedData()
            })
        }
    },
    mounted(){
        this.getAllLogs()
    }
}
</script>

<style scoped>
.interface{
  height: 100%;
  background-color: #F2F6FC;
  
  width: 100%;
}

.user-list{
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