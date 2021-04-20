<template>
    <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 50%">

    <el-form-item label="图书编号">
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>

      <el-form-item label="图书名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="图书作者" prop="author">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
    export default {
  name: "PageUpdate",
  data() {
    return {
      ruleForm: {
        name: "",
        author: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入图书名称", trigger: "blur" },
        ],
        author: [
          { required: true, message: "请输入图书作者", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
            _this.axios.put('http://localhost:8081/book/update', this.ruleForm).then(function(resp){
              if(resp.data == 'success') {
                _this.$alert('书籍信息修改成功', 'OK', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$router.push('/BookList')
                  }
                });
              }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created () {
        const id = this.$route.query.id;
        this.axios.get('http://localhost:8081/book/findById/'+ id)
      .then(resp=>(this.ruleForm = resp.data))
    }
};
</script>

<style scoped>

</style>>