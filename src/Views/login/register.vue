<template>
  <div class="register-wrap">
    <el-form ref="formRef" :model="form" :rules="rules" class="register-form">
      <h2>用户注册</h2>
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
      <el-form-item prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码">
          <template #append
            ><span @click="countdownChange">{{
              countdown.codeText
            }}</span></template
          >
        </el-input>
      </el-form-item>
      <el-button
        @click="onRegister"
        type="primary"
        class="register-btn"
        :loading="loading"
        >注册</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "@/Store";
import type { ElForm } from "element-plus";

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const store = useStore();
// const formRef = ref(null); // 初始值 null，等模板渲染完自动指向那个 <el-form>
const form = reactive({
  username: "",
  password: "",
  code: "",
});
const countdown = reactive({
  codeText: "获取验证码",
  time: 60,
});
// 模拟生成验证码并弹窗显示
let currentCode = "";
const countdownChange = () => {
  if (!form.username) {
    ElMessage.warning("请先输入手机号");
    return;
  }
  // 生成 6 位随机验证码
  currentCode = String(Math.floor(Math.random() * 900000) + 100000);
  // 用弹窗显示（真实项目这里是后端发短信）
  ElMessage({
    message: `验证码已发送到 ${form.username}，验证码：${currentCode}`,
    type: "success",
    duration: 8000,
  });
  if (countdown.time === 60) {
    countdown.codeText = `${countdown.time}秒后重新获取`;
    const timer = setInterval(() => {
      countdown.time--;
      countdown.codeText = `${countdown.time}秒后重新获取`;
      if (countdown.time === 0) {
        clearInterval(timer);
        countdown.codeText = "获取验证码";
        countdown.time = 60;
      }
    }, 1000);
  }
};
const router = useRouter();
const loading = ref(false);
const rules = {
  username: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
const onRegister = async () => {
  try {
    await formRef.value?.validate();
    // 校验验证码
    if (!currentCode) {
      ElMessage.warning("请先获取验证码");
      return;
    }
    if (form.code !== currentCode) {
      ElMessage.error("验证码不正确");
      return;
    }
    loading.value = true;
    try {
      // 直接 await 后端请求结果
      const res = await store.register(form.username, form.password);
      if (res.success) {
        ElMessage.success(res.msg);
        router.push("/login");
      } else {
        ElMessage.error(res.msg);
      }
    } finally {
      loading.value = false;
    }
  } catch {
    // 校验没通过
  }
};
</script>

<style scoped>
.register-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}
.register-form {
  width: 360px;
  padding: 30px;
  background: #fff;
  border-radius: 6px;
}
.register-form h2 {
  text-align: center;
  margin: 0 0 24px;
}
.register-btn {
  width: 100%;
}
.jump-link {
  text-align: right;
  margin-bottom: 10px;
}
</style>
