<script setup lang="ts"></script>

<template>
  <section class="p-8 space-y-8">
    <h1 class="text-3xl font-bold">Купить кота</h1>

    <div class="grid md:grid-cols-2 gap-8 items-start">
      <CatImage />

      <UCard class="space-y-6">
        <p>
          Добро пожаловать в магазин котов! Если Вы ищете себе пушистого друга,
          то это точно по адресу. Жмите вкладку "Магазин" чтобы быстрее
          познакомиться с нашими пушистыми друзьми
        </p>
        <NuxtLink
          to="/shop"
          class="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition"
        >
          <UIcon name="i-lucide-store" class="w-5 h-5" />
          Магазин
        </NuxtLink>
      </UCard>
    </div>
  </section>
</template>

<style scoped></style>
