<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const cats: Record<string, { name: string; img: string; price: number }> = {
  cat1: { name: "Кот №1", img: "/cats/cat1.jpg", price: 1000 },
  cat2: { name: "Кот №2", img: "/cats/cat2.jpg", price: 1200 },
  cat3: { name: "Кот №3", img: "/cats/cat3.jpg", price: 900 },
};

const cat = computed(() => cats[slug.value] || null);

const items = computed<BreadcrumbItem[]>(() => [
  { label: "Магазин", icon: "i-lucide-store", to: "/shop" },
  { label: "Коты", icon: "i-lucide-cat", to: "/shop/cats" },
  { label: cat.value?.name || "Неизвестный кот", icon: "i-lucide-paw" },
]);
</script>

<template>
  <section class="space-y-6">
    <UBreadcrumb :items="items" />

    <div v-if="cat">
      <UCard>
        <h2 class="text-xl font-bold">{{ cat.name }}</h2>
        <NuxtImg :src="cat.img" :alt="cat.name" class="rounded-xl" />
        <p class="mt-4">Цена: {{ cat.price }}₽</p>
        <UButton color="primary" class="mt-4">Купить</UButton>
      </UCard>
    </div>

    <div v-else>
      <UCard>
        <h2 class="text-xl font-bold">Кот не найден</h2>
        <NuxtLink to="/shop/cats" class="text-primary hover:underline">
          Вернуться к списку котов
        </NuxtLink>
      </UCard>
    </div>
  </section>
</template>

<style scoped></style>
