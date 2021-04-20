<template>
  <div>
    <el-table :data="tableData" border style="width: 42.2%">
      <el-table-column fixed prop="id" label="编号" width="150"></el-table-column>
      <el-table-column prop="name" label="书名" width="250"> </el-table-column>
      <el-table-column prop="author" label="作者" width="200"></el-table-column>

      <el-table-column  label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" page-size="5" @current-change='page'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "BookList",
  inject: ['reload'],
  data() {
    return {
      tableData: null,
      total: null
    };
  },
  methods: {
      page(currentpage) {
          this.axios.get('http://localhost:8081/book/findAll/'+currentpage+'/5')
                .then(resp=>(this.tableData = resp.data.content, 
                    this.total = resp.data.totalElements))
      },
      edit(row) {
        this.$router.push({
          path: '/BookUpdate',
          query: {
            id: row.id
          }
        })
      },
      deleteBook(row) {
        const _this = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.axios.delete('http://localhost:8081/book/delete/' + row.id).then()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          window.location.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
  },
  created () {
      this.axios.get('http://localhost:8081/book/findAll/1/5')
      .then(resp=>(this.tableData = resp.data.content, 
                    this.total = resp.data.totalElements))
  },
};
</script>

<style scoped></style>
