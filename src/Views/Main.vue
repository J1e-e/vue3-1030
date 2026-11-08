<template>
  <div class="box">
    <img :src="myImg" class="my-photo" />
    <div class="text">渔家湾</div>
    <button @click="() => router.push('/login')">前往登录界面</button>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import myImg from "@/assets/OIP-C.jpg";

const router = useRouter();
</script>

<style>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}
.box button {
  border-radius: 24px; /* 这个值调大，圆角就更圆润，推荐16~30px */
  padding: 6px 15px; /* 给按钮加内边距，让按钮宽松好看 */
  border: 1px solid #ccc; /* 重置边框，也可以改成 border:none; */
  font-size: 22px;
  cursor: pointer;
}
.my-photo {
  width: 200px; /* 宽 200px */
  height: 200px; /* 高 200px */
  object-fit: cover; /* 裁剪填满，不变形 */
  border-radius: 50%; /* 四个角圆角 50% = 圆形头像 */
}
.text {
  font-size: 20px;
  color: #333;
  margin: 10px 0;
}
</style>
