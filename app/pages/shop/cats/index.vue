<script setup lang="ts">
import { ref, computed } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import type { Cat } from "~/types/cat";

const {
  data: allCats,
  pending,
  error,
} = await useFetch<Cat[]>("https://8f5b56ca183f4214.mokky.dev/catshoptesting");

const visibleCount = ref(6);
const loadStep = 6;
const isEnd = ref(false);
const isLoadingMore = ref(false);

const catsWithSlug = computed(() =>
  (allCats.value ?? []).map((cat) => ({
    ...cat,
    slug: cat.slug ?? `cat${cat.id}`,
  })),
);
const visibleCats = computed(() =>
  catsWithSlug.value.slice(0, visibleCount.value),
);

async function loadMore() {
  if (isLoadingMore.value || isEnd.value) return;

  isLoadingMore.value = true;

  await new Promise((resolve) => setTimeout(resolve, 800));

  if (visibleCount.value < catsWithSlug.value.length) {
    visibleCount.value += loadStep;
  } else {
    isEnd.value = true;
  }

  isLoadingMore.value = false;
}

useInfiniteScroll(window, loadMore, { distance: 300 });
</script>

<template>
  <section class="space-y-6">
    <AppBreadcrumbs />

    <UCard>
      <h2 class="text-xl font-bold mb-4">Наши коты</h2>

      <p v-if="pending">Загружаем котов...</p>
      <p v-else-if="error">Ошибка при загрузке котов</p>

      <ul v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="cat in visibleCats" :key="cat.id">
          <NuxtLink :to="`/shop/cats/${cat.slug}`">
            <UCard class="hover:shadow-lg transition">
              <h2 class="text-xl font-bold">{{ cat.name }}</h2>
              <p class="mt-4 text-sm opacity-80">{{ cat.desc }}</p>
            </UCard>
          </NuxtLink>
        </li>
      </ul>

      <div v-if="isLoadingMore" class="text-center py-4 text-gray-500">
        Загружаем ещё котов...
      </div>

      <div v-if="isEnd" class="text-center py-4 text-gray-400">
        Все коты загружены
      </div>
    </UCard>
  </section>
</template>

<style scoped></style>
