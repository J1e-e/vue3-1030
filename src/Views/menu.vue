<template>
  <main class="menu-page">
    <div class="account-bar">
      <button class="home-button" type="button" @click="router.push('/')">
        <el-icon><House /></el-icon>
        <span>主页</span>
      </button>
      <div class="account-actions">
        <span class="account-name">
          <el-icon><UserFilled /></el-icon>
          {{ userStore.username || "用户" }}
        </span>
        <button class="logout-button" type="button" @click="logout">
          <el-icon><SwitchButton /></el-icon>
          <span>登出</span>
        </button>
      </div>
    </div>

    <header class="menu-header">
      <div>
        <p class="eyebrow">FRESH · TASTY · DAILY</p>
        <h1>今天吃点什么？</h1>
        <p class="header-description">用心烹饪每一餐，挑选喜欢的美味吧</p>
      </div>
      <button class="header-cart" type="button" @click="router.push('/cart')">
        <el-badge
          :value="cartStore.totalQuantity"
          :hidden="!cartStore.totalQuantity"
        >
          <el-icon :size="23"><ShoppingCart /></el-icon>
        </el-badge>
        <span>购物车</span>
      </button>
    </header>

    <div class="menu-layout">
      <nav class="category-nav" aria-label="菜品分类">
        <p class="nav-title">菜品分类</p>
        <button
          v-for="category in categories"
          :key="category.id"
          class="category-link"
          type="button"
          @click="scrollToCategory(category.id)"
        >
          <span>{{ category.emoji }}</span>
          {{ category.name }}
        </button>
      </nav>

      <div class="dishes">
        <section
          v-for="category in categories"
          :id="category.id"
          :key="category.id"
          class="dish-section"
        >
          <div class="section-heading">
            <div>
              <h2>{{ category.name }}</h2>
              <p>{{ category.description }}</p>
            </div>
            <span class="dish-count">{{ category.dishes.length }} 道菜</span>
          </div>

          <div class="dish-grid">
            <article
              v-for="dish in category.dishes"
              :key="dish.id"
              class="dish-card"
            >
              <div class="dish-visual" :class="dish.tone">
                <span v-if="dish.tag" class="dish-tag">{{ dish.tag }}</span>
                <span class="dish-emoji" role="img" :aria-label="dish.name">
                  <img
                    class="dish-emoji-img"
                    v-if="dish.emoji.endsWith('.jpg')"
                    :src="dish.emoji"
                    :alt="dish.name"
                  />
                  <span v-else>{{ dish.emoji }}</span>
                </span>
              </div>
              <div class="dish-info">
                <div class="dish-title-row">
                  <h3>{{ dish.name }}</h3>
                  <span class="dish-sales">{{ dish.sales }}人点过</span>
                </div>
                <p class="dish-description">{{ dish.description }}</p>
                <div class="dish-bottom">
                  <span class="dish-price"
                    ><small>￥</small>{{ dish.price.toFixed(2) }}</span
                  >
                  <div class="quantity-control">
                    <button
                      v-if="cartStore.quantityOf(dish.id)"
                      class="quantity-button secondary"
                      type="button"
                      :aria-label="`减少${dish.name}`"
                      @click="cartStore.decrease(dish.id)"
                    >
                      <el-icon><Minus /></el-icon>
                    </button>
                    <span v-if="cartStore.quantityOf(dish.id)" class="quantity">
                      {{ cartStore.quantityOf(dish.id) }}
                    </span>
                    <button
                      class="quantity-button"
                      type="button"
                      :aria-label="`添加${dish.name}到购物车`"
                      @click="cartStore.add(dish)"
                    >
                      <el-icon><Plus /></el-icon>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>

    <button class="floating-cart" type="button" @click="router.push('/cart')">
      <el-badge
        :value="cartStore.totalQuantity"
        :hidden="!cartStore.totalQuantity"
      >
        <el-icon :size="22"><ShoppingCart /></el-icon>
      </el-badge>
      <span>去购物车</span>
      <strong>￥{{ cartStore.totalPrice.toFixed(2) }}</strong>
    </button>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCartStore } from "../Store/cart";
import { useStore } from "../Store";
import { dishCategories } from "../data/dishes";

const router = useRouter();
const cartStore = useCartStore();
const userStore = useStore();

function logout() {
  userStore.logout();
  router.replace("/login");
}

const categories = dishCategories;

function scrollToCategory(id) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
.menu-page {
  --text: #28251f;
  --muted: #918c82;
  --accent: #e78342;
  min-height: 100vh;
  padding: 38px max(24px, calc((100vw - 1180px) / 2)) 110px;
  color: var(--text);
  background: #fbfaf7;
  text-align: left;
}

.account-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 26px;
}

.home-button,
.logout-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 13px;
  border: 1px solid #eee9df;
  border-radius: 9px;
  color: #5c574e;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
}

.home-button:hover,
.logout-button:hover {
  color: #b85e28;
  border-color: #efc7a8;
}

.account-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.account-name {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #5c574e;
  font-size: 13px;
}

.logout-button {
  color: #9c573a;
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.menu-header h1 {
  margin: 0;
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
}

.header-description {
  margin: 9px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.header-cart {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border: 1px solid #eee9df;
  border-radius: 12px;
  color: var(--text);
  background: #fff;
  font-size: 14px;
  cursor: pointer;
}

.menu-layout {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 36px;
  align-items: start;
}

.category-nav {
  position: sticky;
  top: 24px;
  padding: 18px 12px;
  border-radius: 16px;
  background: #fff;
}

.nav-title {
  margin: 0 10px 12px;
  color: var(--muted);
  font-size: 12px;
}

.category-link {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  padding: 12px 10px;
  border: 0;
  border-radius: 10px;
  color: #5c574e;
  background: transparent;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.category-link:hover {
  color: #b85e28;
  background: #fff4eb;
}

.dish-section {
  margin-bottom: 42px;
  scroll-margin-top: 24px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
}

.section-heading h2 {
  margin: 0;
  font-size: 21px;
}

.section-heading p {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.dish-count {
  color: #aaa397;
  font-size: 12px;
}

.dish-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.dish-card {
  display: grid;
  grid-template-columns: 126px minmax(0, 1fr);
  min-height: 142px;
  overflow: hidden;
  border: 1px solid #f1eee8;
  border-radius: 14px;
  background: #fff;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.dish-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgb(68 51 24 / 7%);
}

.dish-visual {
  position: relative;
  display: grid;
  min-height: 142px;
  place-items: center;
}

.peach {
  background: #fff0e6;
}
.cream {
  background: #fff5dc;
}
.lavender {
  background: #f3edfa;
}
.mint {
  background: #eaf5e9;
}

.dish-emoji {
  font-size: 56px;
  line-height: 1;
}

.dish-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 7px;
  border-radius: 5px;
  color: #a44f20;
  background: rgb(255 255 255 / 82%);
  font-size: 10px;
}

.dish-info {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 14px 12px;
}

.dish-title-row,
.dish-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.dish-title-row h3 {
  overflow: hidden;
  margin: 0;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dish-sales {
  flex-shrink: 0;
  color: #aaa397;
  font-size: 10px;
}

.dish-description {
  display: -webkit-box;
  overflow: hidden;
  margin: 9px 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.dish-price {
  color: #c8632a;
  font-size: 19px;
  font-weight: 700;
}

.dish-price small {
  margin-right: 2px;
  font-size: 12px;
}

.dish-emoji-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 9px;
}

.quantity-button {
  display: grid;
  width: 28px;
  height: 28px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: #fff;
  background: var(--accent);
  cursor: pointer;
}

.quantity-button.secondary {
  border: 1px solid #e8dfd3;
  color: #786f63;
  background: #fff;
}

.quantity {
  min-width: 12px;
  font-size: 13px;
  text-align: center;
}

.floating-cart {
  position: fixed;
  z-index: 10;
  right: max(24px, calc((100vw - 1180px) / 2));
  bottom: 24px;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 14px 20px;
  border: 0;
  border-radius: 30px;
  color: #fff;
  background: #29261f;
  box-shadow: 0 8px 24px rgb(35 29 18 / 20%);
  font-size: 14px;
  cursor: pointer;
}

.floating-cart strong {
  padding-left: 12px;
  border-left: 1px solid rgb(255 255 255 / 25%);
  font-size: 15px;
}

@media (max-width: 900px) {
  .menu-page {
    padding-right: 20px;
    padding-left: 20px;
  }

  .menu-layout {
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 20px;
  }

  .dish-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .menu-page {
    padding: 24px 14px 100px;
  }

  .menu-header {
    margin-bottom: 24px;
  }

  .account-bar {
    margin-bottom: 22px;
  }

  .account-actions {
    gap: 9px;
  }

  .account-name {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-description {
    max-width: 220px;
    line-height: 1.5;
  }

  .header-cart {
    gap: 7px;
    padding: 10px;
    font-size: 12px;
  }

  .menu-layout {
    display: block;
  }

  .category-nav {
    position: static;
    display: flex;
    overflow-x: auto;
    gap: 4px;
    margin-bottom: 26px;
    padding: 8px;
  }

  .nav-title {
    display: none;
  }

  .category-link {
    width: auto;
    flex-shrink: 0;
    gap: 6px;
    padding: 10px;
    font-size: 12px;
  }

  .dish-card {
    grid-template-columns: 104px minmax(0, 1fr);
  }

  .dish-visual {
    min-height: 132px;
  }

  .dish-emoji {
    font-size: 46px;
  }

  .dish-info {
    padding: 12px 10px;
  }

  .dish-title-row h3 {
    font-size: 14px;
  }

  .floating-cart {
    right: 14px;
    bottom: 14px;
    left: 14px;
    justify-content: center;
  }
}
</style>
