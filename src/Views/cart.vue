<template>
  <main class="cart-page">
    <header class="cart-header">
      <button class="back-button" type="button" @click="router.push('/menu')">
        <el-icon><ArrowLeft /></el-icon>
        继续点餐
      </button>
      <h1>我的购物车</h1>
      <button
        v-if="cartStore.items.length"
        class="clear-button"
        type="button"
        @click="cartStore.clear()"
      >
        清空购物车
      </button>
      <span v-else class="header-placeholder" />
    </header>

    <section v-if="cartStore.items.length" class="cart-content">
      <div class="cart-list">
        <div class="list-heading">
          <span>菜品</span>
          <span>数量</span>
          <span>小计</span>
        </div>
        <article v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <div class="item-details">
            <span class="item-emoji" role="img" :aria-label="item.name">
              <img
                v-if="item.emoji.endsWith('.jpg')"
                class="item-image"
                :src="item.emoji"
                :alt="item.name"
              />
              <span v-else>{{ item.emoji }}</span>
            </span>
            <div>
              <h2>{{ item.name }}</h2>
              <p>{{ item.description }}</p>
            </div>
          </div>
          <div class="quantity-control">
            <button type="button" aria-label="减少数量" @click="cartStore.decrease(item.id)">
              <el-icon><Minus /></el-icon>
            </button>
            <span>{{ item.count }}</span>
            <button type="button" aria-label="增加数量" @click="cartStore.add(item)">
              <el-icon><Plus /></el-icon>
            </button>
          </div>
          <div class="item-total">
            <strong>￥{{ (item.price * item.count).toFixed(2) }}</strong>
            <button
              class="remove-button"
              type="button"
              :aria-label="`移除${item.name}`"
              @click="cartStore.remove(item.id)"
            >
              <el-icon><Delete /></el-icon>
            </button>
          </div>
        </article>
      </div>

      <aside class="summary">
        <h2>订单摘要</h2>
        <div class="summary-line">
          <span>菜品数量</span>
          <span>{{ cartStore.totalQuantity }} 份</span>
        </div>
        <div class="summary-line">
          <span>配送费</span>
          <span class="free-delivery">免配送费</span>
        </div>
        <div class="summary-total">
          <span>合计</span>
          <strong>￥{{ cartStore.totalPrice.toFixed(2) }}</strong>
        </div>
        <el-button class="checkout-button" type="warning" @click="submitOrder">
          确认下单
        </el-button>
        <p class="demo-note">演示页面暂不接入实际支付</p>
      </aside>
    </section>

    <section v-else class="empty-cart">
      <div class="empty-emoji" role="img" aria-label="空购物车">🛒</div>
      <h2>购物车还是空的</h2>
      <p>去菜单看看，挑几道喜欢的菜吧</p>
      <el-button type="warning" @click="router.push('/menu')">去选菜</el-button>
    </section>
  </main>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useCartStore } from "../Store/cart";

const router = useRouter();
const cartStore = useCartStore();

function submitOrder() {
  ElMessage.success("订单已提交（演示），感谢您的选购！");
  cartStore.clear();
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  padding: 32px max(20px, calc((100vw - 1060px) / 2));
  color: #28251f;
  background: #fbfaf7;
  text-align: left;
}

.cart-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: 30px;
}

.cart-header h1 {
  margin: 0;
  font-size: 25px;
}

.back-button,
.clear-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: fit-content;
  padding: 8px 0;
  border: 0;
  color: #716b60;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
}

.clear-button {
  justify-self: end;
  color: #b76236;
}

.cart-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  align-items: start;
  gap: 24px;
}

.cart-list,
.summary {
  overflow: hidden;
  border: 1px solid #f0ede7;
  border-radius: 14px;
  background: #fff;
}

.list-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px 100px;
  padding: 17px 22px;
  border-bottom: 1px solid #f2efe9;
  color: #958f84;
  font-size: 12px;
}

.list-heading span:nth-child(2),
.list-heading span:nth-child(3) {
  text-align: center;
}

.cart-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px 100px;
  align-items: center;
  gap: 8px;
  padding: 18px 22px;
  border-bottom: 1px solid #f5f2ed;
}

.cart-item:last-child {
  border-bottom: 0;
}

.item-details {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 14px;
}

.item-emoji {
  display: grid;
  width: 58px;
  height: 58px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 12px;
  background: #fff3e7;
  font-size: 32px;
}

.item-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.item-details h2 {
  margin: 0 0 6px;
  font-size: 15px;
}

.item-details p {
  overflow: hidden;
  max-width: 290px;
  margin: 0;
  color: #979185;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
}

.quantity-control button {
  display: grid;
  width: 26px;
  height: 26px;
  padding: 0;
  place-items: center;
  border: 1px solid #e8e2d9;
  border-radius: 50%;
  color: #5d574d;
  background: #fff;
  cursor: pointer;
}

.quantity-control span {
  min-width: 12px;
  font-size: 14px;
  text-align: center;
}

.item-total {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.item-total strong {
  color: #bd5f2d;
  font-size: 14px;
}

.remove-button {
  display: grid;
  padding: 4px;
  place-items: center;
  border: 0;
  color: #a7a094;
  background: transparent;
  cursor: pointer;
}

.remove-button:hover {
  color: #d34b3f;
}

.summary {
  padding: 22px;
}

.summary h2 {
  margin: 0 0 22px;
  font-size: 17px;
}

.summary-line,
.summary-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
  color: #797367;
  font-size: 13px;
}

.free-delivery {
  color: #58824f;
}

.summary-total {
  margin: 22px 0;
  padding-top: 18px;
  border-top: 1px solid #f0ede7;
  color: #28251f;
  font-size: 15px;
}

.summary-total strong {
  color: #bd5f2d;
  font-size: 22px;
}

.checkout-button {
  width: 100%;
  height: 42px;
  border: 0;
  font-weight: 600;
}

.demo-note {
  margin: 12px 0 0;
  color: #aaa397;
  font-size: 11px;
  text-align: center;
}

.empty-cart {
  display: flex;
  min-height: 55vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-emoji {
  margin-bottom: 12px;
  font-size: 64px;
  filter: grayscale(0.35);
}

.empty-cart h2 {
  margin: 0;
  font-size: 21px;
}

.empty-cart p {
  margin: 10px 0 22px;
  color: #918c82;
  font-size: 14px;
}

@media (max-width: 760px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .summary {
    max-width: none;
  }
}

@media (max-width: 520px) {
  .cart-page {
    padding: 22px 12px;
  }

  .cart-header {
    grid-template-columns: 1fr auto;
    row-gap: 16px;
  }

  .cart-header h1 {
    grid-column: 1 / -1;
    grid-row: 1;
    font-size: 22px;
  }

  .back-button,
  .clear-button,
  .header-placeholder {
    grid-row: 2;
  }

  .back-button {
    grid-column: 1;
  }

  .clear-button,
  .header-placeholder {
    grid-column: 2;
  }

  .list-heading,
  .cart-item {
    grid-template-columns: minmax(0, 1fr) 88px 78px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .item-details {
    gap: 8px;
  }

  .item-emoji {
    width: 42px;
    height: 42px;
    font-size: 25px;
  }

  .item-details h2 {
    font-size: 13px;
  }

  .item-details p {
    max-width: 110px;
  }

  .quantity-control {
    gap: 6px;
  }

  .quantity-control button {
    width: 23px;
    height: 23px;
  }

  .item-total {
    gap: 4px;
  }

  .item-total strong {
    font-size: 12px;
  }
}
</style>
