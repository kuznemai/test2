<script setup lang="ts">
import { computed } from "vue";
import type { Cat } from "~/types/cat";

const {
  data: cats,
  pending,
  error,
} = await useFetch<Cat[]>("https://8f5b56ca183f4214.mokky.dev/catshoptesting");

const catsWithSlug = computed<Cat[]>(() => {
  if (!cats.value) return [];

  return cats.value.map((cat) => ({
    ...cat,
    slug: cat.slug ?? `cat${cat.id}`,
  }));
});
</script>

<template>
  <section class="space-y-6">
    <AppBreadcrumbs />

    <UCard>
      <h2 class="text-xl font-bold mb-4">Наши коты</h2>

      <p v-if="pending">Загружаем котов...</p>
      <p v-else-if="error">Ошибка при загрузке котов</p>

      <ul v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="cat in catsWithSlug" :key="cat.id">
          <NuxtLink :to="`/shop/cats/${cat.slug}`">
            <UCard class="hover:shadow-lg transition">
              <h2 class="text-xl font-bold">{{ cat.name }}</h2>
              <p class="mt-4 text-sm opacity-80">{{ cat.desc }}</p>
            </UCard>
          </NuxtLink>
        </li>
      </ul>
    </UCard>
  </section>
</template>

<style scoped></style>
