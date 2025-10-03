<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const items: BreadcrumbItem[] = [{ label: "Магазин", icon: "i-lucide-store" }];
</script>

<template>
  <section class="space-y-6">
    <UBreadcrumb :items="items" />

    <UCard>
      <h2 class="text-xl font-bold">Магазин котов</h2>
      <p class="mt-2">Добро пожаловать! Здесь вы можете выбрать себе кота</p>
      <NuxtLink to="/shop/cats" class="block mt-4 text-primary hover:underline">
        Перейти к списку котов →
      </NuxtLink>
    </UCard>
  </section>
  <CatImage />
</template>

<style scoped></style>
