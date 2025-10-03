<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
</script>

<template>
  <section class="p-8 space-y-8">
    <UBreadcrumb :items="items" />

    <h1 class="text-3xl font-bold">Купить кота</h1>

    <div class="grid md:grid-cols-2 gap-8 items-start">
      <CatImage />

      <UCard class="space-y-6">
        <p>
          Добро пожаловать в магазин котов! Если Вы ищете себе пушистого друга,
          то это точно по адресу. Жмите вкладку "Магазин" чтобы быстрее
          познакомиться с нашими пушистыми друзьми
        </p>
      </UCard>
    </div>
  </section>
</template>

<style scoped></style>
