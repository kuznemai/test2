<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const cats = [
  {
    slug: "cat1",
    name: "Кот №1",
    desc: "Несмотря на специфическую наружность, кот очень любвеобильный",
  },
  {
    slug: "cat2",
    name: "Кот №2",
    desc: "Много ест, мало спит",
  },
  {
    slug: "cat3",
    name: "Кот №3",
    desc: "Не уживается с комнатными растениями",
  },
];
// TODO:Вынести Breadcrumb в layout
</script>

<template>
  <section class="space-y-6">
    <AppBreadcrumbs />

    <UCard>
      <h2 class="text-xl font-bold mb-4">Наши коты</h2>
      <ul class="space-y-2">
        <li v-for="cat in cats" :key="cat.slug">
          <NuxtLink :to="`/shop/cats/${cat.slug}`" class="block">
            <UCard>
              <h2 class="text-xl font-bold">{{ cat.name }}</h2>
              <p class="mt-4">{{ cat.desc }}</p>
            </UCard>
          </NuxtLink>
        </li>
      </ul>
    </UCard>
  </section>
</template>

<style scoped></style>
