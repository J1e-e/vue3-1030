import express from "express";

const app = express();
app.use(express.json());

// 模拟用户数据库（内存里存，重启就没了）
// 预置一个测试账号：手机号 17673873233，密码 123456
const users = [
  {
    username: "17673873233",
    password: "123456",
    token: "Bearer_demo_token_001",
  },
];

// 登录接口
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log("收到登录请求：", username);

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.json({ success: false, msg: "账号或密码错误，请先注册" });
  }

  res.json({ success: true, msg: "登录成功", token: user.token });
});

// 注册接口
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  console.log("收到注册请求：", username);

  if (users.find((u) => u.username === username)) {
    return res.json({ success: false, msg: "该账号已被注册" });
  }

  const token = "Bearer_" + Date.now();
  users.push({ username, password, token });

  res.json({ success: true, msg: "注册成功", token });
});

// 监听 3000 端口
app.listen(3000, () => {
  console.log("✅ 后端已启动:http://localhost:3000");
  console.log("👉 测试账号:17673873233 / 123456");
});
