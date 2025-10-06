<script setup lang="ts">
import { useRoute } from "#imports";
import type { Cat } from "~/types/cat";
import { useCartStore } from "~/stores/cart";
const cart = useCartStore();

const route = useRoute();
const slug = route.params.slug as string;

const catId = Number(slug.replace("cat", ""));

const {
  data: cat,
  pending,
  error,
} = await useFetch<Cat>(
  `https://8f5b56ca183f4214.mokky.dev/catshoptesting/${catId}`,
);

const quantityOptions = computed(() => {
  const count = cat.value?.quantity ?? 0;
  return Array.from({ length: count }, (_, i) => i + 1);
});
const numberofcats = ref(1);

const buyCat = async () => {
  if (!cat.value) return;

  const qty = numberofcats.value;
  if (qty > (cat.value.quantity ?? 0)) {
    alert("Столько котов нет в наличии!");
    return;
  }
  cart.addToCart(cat.value, qty);

  await $fetch(`https://8f5b56ca183f4214.mokky.dev/catshoptesting/${catId}`, {
    method: "PATCH",
    body: { quantity: cat.value.quantity - qty },
  });

  cat.value.quantity -= qty;

  alert("Кот добавлен в корзину");
};
</script>

<template>
  <section class="space-y-6">
    <UButton
      color="gray"
      variant="soft"
      icon="i-lucide-arrow-left"
      to="/shop/cats"
    >
      Назад
    </UButton>

    <UCard v-if="pending">Загружаем кота... </UCard>

    <div v-else-if="error">
      <UCard>
        <h2 class="text-xl font-bold">Ошибка при загрузке кота</h2>
        <NuxtLink to="/shop/cats" class="text-primary hover:underline">
          Вернуться к списку котов
        </NuxtLink>
      </UCard>
    </div>

    <div v-else-if="cat">
      <UCard>
        <h2 class="text-xl font-bold">{{ cat.name }}</h2>

        <NuxtImg
          v-if="cat.img"
          :src="cat.img"
          :alt="cat.name"
          class="rounded-xl m-3"
        />

        <p class="mt-4">{{ cat.desc }}</p>

        <p v-if="cat.price" class="mt-2 font-semibold">
          Цена: {{ cat.price }}₽
        </p>

        <div class="flex gap-3 mt-4 items-center">
          <USelect v-model="numberofcats" :items="quantityOptions" />
          <UButton color="primary" @click="buyCat"> Купить </UButton>
        </div>
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
