<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const items: BreadcrumbItem[] = [
  { label: "Магазин", icon: "i-lucide-store", to: "/shop" },
  { label: "Коты", icon: "i-lucide-cat" },
];
</script>

<template>
  <section class="space-y-6">
    <UBreadcrumb :items="items" />

    <UCard>
      <h2 class="text-xl font-bold mb-4">Наши коты</h2>
      <ul class="space-y-2">
        <li>
          <NuxtLink to="/shop/cats/cat1" class="text-primary hover:underline"
            >Кот №1</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/shop/cats/cat2" class="text-primary hover:underline"
            >Кот №2</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/shop/cats/cat3" class="text-primary hover:underline"
            >Кот №3</NuxtLink
          >
        </li>
      </ul>
    </UCard>
  </section>
</template>

<style scoped></style>
