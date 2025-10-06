<script setup lang="ts"></script>

<template>
  <section class="space-y-6">
    <UCard>
      <h2 class="text-xl font-bold">Магазин котов</h2>
      <p class="mt-2">
        Итак, вы решились на покупку пушистого друга. Наш каталог котов точно не
        оставит Вас равнодушным и без кота Вы не уйдете :)
      </p>
      <NuxtLink to="/shop/cats" class="block mt-4 text-primary hover:underline">
        Перейти к списку котов →
      </NuxtLink>
    </UCard>
  </section>
  <CatImage />
</template>

<style scoped></style>
