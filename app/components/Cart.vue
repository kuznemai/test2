<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const cart = useCartStore();
</script>

<template>
  <UCard class="space-y-4">
    <h2 class="text-xl font-bold">Корзина</h2>

    <div v-if="cart.items.length === 0">Корзина пуста</div>

    <div v-else class="space-y-3">
      <div
        v-for="item in cart.items"
        :key="item.cat.id"
        class="flex justify-between items-center border-b pb-2"
      >
        <div>
          <p class="font-semibold">{{ item.cat.name }}</p>
          <p>Кол-во: {{ item.quantity }}</p>
          <p>Цена: {{ item.cat.price * item.quantity }}₽</p>
        </div>

        <UButton
          color="red"
          variant="soft"
          icon="i-lucide-trash"
          @click="cart.removeFromCart(item.cat.id)"
        >
          Удалить
        </UButton>
      </div>

      <div class="font-bold mt-4">Итого: {{ cart.totalPrice }}₽</div>

      <UButton color="gray" @click="cart.clearCart"> Очистить корзину </UButton>
    </div>
  </UCard>
</template>

<style scoped></style>
