<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const options = ["Белый", "Рыжий", "Серый", "Чёрный"];
const items = ref<BreadcrumbItem[]>([
  { label: "Магазин", icon: "i-lucide-store", to: "/shop" },
  { label: "Коты", icon: "i-lucide-cat", to: "/shop/cats" },
  { label: "Кот №1", icon: "i-lucide-paw" },
]);
const value = ref(options[1]);
function buyCat() {
  alert(`Вы купили кота цвета: ${value.value} `);
}
</script>

<template>
  <section class="p-8 space-y-8">
    <UBreadcrumb :items="items" />

    <h1 class="text-3xl font-bold">Купить кота</h1>

    <div class="grid md:grid-cols-2 gap-8 items-start">
      <CatImage />

      <UCard class="space-y-6">
        <div class="space-y-4">
          <UFormGroup label="Выберите цвет кота">
            <USelect v-model="value" :items="options" class="w-60 m-3" />
          </UFormGroup>

          <UButton
            icon="i-lucide-shopping-cart"
            color="primary"
            @click="buyCat"
          >
            Купить кота
          </UButton>
        </div>
      </UCard>
    </div>
  </section>
</template>

<style scoped></style>
