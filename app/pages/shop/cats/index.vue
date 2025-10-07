<script setup lang="ts">
import { ref, computed, watch } from "vue";
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
const isEnd = ref(false);
const error = ref<Error | null>(null);

const isInitialLoading = ref(true);

const catsWithSlug = computed(() =>
  cats.value.map((cat) => ({
    ...cat,
    slug: (cat as any).slug ?? `cat${cat.id}`,
  })),
);

const { data, pending } = useLazyFetch<ApiResponse>(
  () =>
    `https://8f5b56ca183f4214.mokky.dev/catshoptesting?limit=${perPage}&page=${page.value}`,
  {
    watch: [page],
    server: false,
    immediate: true,
    transform: (res) => res.items,
    onResponse({ response }) {
      if (!response._data?.items?.length) isEnd.value = true;
    },
    onError(err) {
      error.value = err as Error;
    },
  },
);

watch(data, (newCats) => {
  if (!newCats?.length) return;
  const uniqueCats = newCats.filter(
    (item) => !cats.value.some((c) => c.id === item.id),
  );
  cats.value.push(...uniqueCats);
  isInitialLoading.value = false;
});

const loadMore = async () => {
  if (pending.value || isEnd.value) return;
  page.value += 1;
};

useInfiniteScroll(window, loadMore, { distance: 300 });
</script>

<template>
  <section class="space-y-6">
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

      <div
        v-if="pending && !isInitialLoading"
        class="text-center py-4 text-gray-500"
      >
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
