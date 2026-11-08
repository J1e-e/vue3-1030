import { defineStore } from "pinia";
import { StoreName } from "./store-name";
import request from "../utils/request";

const TOKEN_KEY = "user_token";
const USERNAME_KEY = "user_name";

export const useStore = defineStore(StoreName.User, {
  state: () => {
    return {
      token: localStorage.getItem(TOKEN_KEY) || "",
      username: localStorage.getItem(USERNAME_KEY) || "",
    };
  },
  getters: {
    isLogin: (state) => !!state.token,
    currentUser: (state) => {
      if (!state.token) return null;
      return { username: state.username, token: state.token };
    },
  },
  actions: {
    logout() {
      this.token = "";
      this.username = "";
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USERNAME_KEY);
    },
    // ✅ 改成 async：调后端 API
    async login(username, password) {
      try {
        const res = await request.post("/api/login", { username, password });
        const { success, msg, token } = res.data;
        if (success) {
          this.token = token;
          this.username = username;
          localStorage.setItem(TOKEN_KEY, token);
          localStorage.setItem(USERNAME_KEY, username);
        }
        return res.data;
      } catch (err) {
        return { success: false, msg: err.response?.data?.msg || "网络错误" };
      }
    },
    async register(username, password) {
      try {
        const res = await request.post("/api/register", { username, password });
        const { success, msg, token } = res.data;
        if (success) {
          this.token = token;
          this.username = username;
          localStorage.setItem(TOKEN_KEY, token);
          localStorage.setItem(USERNAME_KEY, username);
        }
        return res.data;
      } catch (err) {
        return { success: false, msg: err.response?.data?.msg || "网络错误" };
      }
    },
  },
});
