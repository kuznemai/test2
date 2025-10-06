<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
const cart = useCartStore();
</script>
<template>
  <div>
    <header class="flex justify-between items-center p-4 border-b">
      <AppBreadcrumbs class="hover:text-emerald-800 mt-5" />

      <nav class="flex items-center gap-4">
        <NuxtLink to="/cart" class="relative">
          <UIcon name="i-lucide-shopping-cart" size="24" />

          <span
            v-if="cart.totalCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5"
          >
            {{ cart.totalCount }}
          </span>
        </NuxtLink>
      </nav>
    </header>

    <main class="p-6">
      <slot />
    </main>
  </div>
</template>

<style scoped></style>
