<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const options = ["option1", "option2", "option3", "option4"];
const items = ref<BreadcrumbItem[]>([
  {
    label: "Docs",
    icon: "i-lucide-book-open",
    to: "/docs",
  },
  {
    label: "Components",
    icon: "i-lucide-box",
    to: "/docs/components",
  },
  {
    label: "Breadcrumb",
    icon: "i-lucide-link",
    to: "/docs/components/breadcrumb",
  },
]);
const value = ref(options[0]);
</script>

<template>
  <section class="p-8 space-y-8">
    <UBreadcrumb :items="items" />

    <div id="demo" class="space-y-4">
      <h1 class="text-3xl font-bold">Nuxt UI speed test</h1>

      <div class="flex items-center gap-4">
        <USelect v-model="value" :items="options" class="w-60" />
        <UButton label="Нажми меня" @click="console.log('clicked')" />
      </div>
    </div>
    <div>
      <CatImage></CatImage>
    </div>
  </section>
</template>

<style scoped></style>
