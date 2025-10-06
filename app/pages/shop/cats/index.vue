<script setup lang="ts">
import { ref, computed } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import type { Cat } from "~/types/cat";

interface ApiMeta {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  remaining_count: number;
}

interface ApiResponse {
  meta: ApiMeta;
  items: Cat[];
}

const cats = ref<Cat[]>([]);
const page = ref(1);
const perPage = 10;

const isInitialLoading = ref(true);
const isLoadingMore = ref(false);
const isEnd = ref(false);
const error = ref<Error | null>(null);

const catsWithSlug = computed(() =>
  cats.value.map((cat) => ({
    ...cat,
    slug: (cat as any).slug ?? `cat${cat.id}`,
  })),
);

async function fetchCats() {
  try {
    const res = await $fetch<ApiResponse>(
      `https://8f5b56ca183f4214.mokky.dev/catshoptesting?limit=${perPage}&page=${page.value}`,
    );

    if (res?.items?.length) {
      const newOnes = res.items.filter(
        (item) => !cats.value.some((c) => c.id === item.id),
      );
      cats.value.push(...newOnes);

      if (res.meta.current_page >= res.meta.total_pages) {
        isEnd.value = true;
      } else {
        page.value += 1;
      }
    } else {
      isEnd.value = true;
    }
  } catch (e: any) {
    error.value = e;
  } finally {
    isInitialLoading.value = false;
  }
}

await fetchCats();

async function loadMore() {
  if (isLoadingMore.value || isEnd.value) return;
  isLoadingMore.value = true;
  await fetchCats();
  isLoadingMore.value = false;
}

useInfiniteScroll(window, loadMore, { distance: 300 });
</script>

<template>
  <section class="space-y-6">
    <AppBreadcrumbs />

    <UCard>
      <h2 class="text-xl font-bold mb-4">Наши коты</h2>

      <p v-if="error">Ошибка при загрузке котов: {{ error.message }}</p>

      <p v-else-if="isInitialLoading">Загружаем котов...</p>

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

      <div v-if="isLoadingMore" class="text-center py-4 text-gray-500">
        Загружаем ещё котов...
      </div>

      <div
        v-if="isEnd && !isInitialLoading"
        class="text-center py-4 text-gray-400"
      >
        Все коты загружены
      </div>
    </UCard>
  </section>
</template>

<style scoped></style>
