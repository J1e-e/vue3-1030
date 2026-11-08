<template>
  <div class="login-wrap">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      class="login-form"
      @keyup.enter="onLogin"
    >
      <h2>用户登录</h2>
      <div class="jump-link">
        <el-link type="primary" @click="router.push('/register')"
          >没有账号？去注册</el-link
        >
      </div>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      <el-button
        type="primary"
        class="login-btn"
        :loading="loading"
        @click="onLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "@/Store";

const store = useStore();
const router = useRouter(); // 拿到路由器实例，后面用它跳页面
const formRef = ref(null); // 初始值 null，等模板渲染完自动指向那个 <el-form>
const loading = ref(false); // 按钮 loading 状态，默认不加载

const form = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const onLogin = async () => {
  await formRef.value.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      // 直接 await 后端请求结果
      const res = await store.login(form.username, form.password);
      if (res.success) {
        ElMessage.success(res.msg);
        router.push("/menu");
      } else {
        ElMessage.error(res.msg);
      }
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
.login-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}
.login-form {
  width: 360px;
  padding: 30px;
  background: #fff;
  border-radius: 6px;
}
.login-form h2 {
  text-align: center;
  margin: 0 0 24px;
}
.login-btn {
  width: 100%;
}
.jump-link {
  text-align: right;
  margin-bottom: 10px;
}
</style>
