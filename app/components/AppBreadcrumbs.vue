<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import { useRoute } from "#imports";

const route = useRoute();

const home: BreadcrumbItem = {
  label: "Главная",
  icon: "i-lucide-home",
  to: "/",
};

const mapLabels: Record<string, BreadcrumbItem> = {
  shop: { label: "Магазин", icon: "i-lucide-store", to: "/shop" },
  cats: { label: "Наши коты", icon: "i-lucide-heart", to: "/shop/cats" },
};

const items = computed<BreadcrumbItem[]>(() => {
  const parts = route.path.split("/").filter(Boolean);
  const acc: BreadcrumbItem[] = [home];

  let path = "";
  for (const part of parts) {
    path += "/" + part;
    const label = decodeURIComponent(part);
    acc.push({ label, to: path });
  }

  acc.forEach((item, i) => {
    const override = mapLabels[item.label];
    if (override) acc[i] = override;
  });

  if (acc.length > 1) {
    const last = acc[acc.length - 1];
    acc[acc.length - 1] = { label: last.label, icon: "i-lucide-heart" };
  }

  return acc;
});
</script>

<template>
  <UBreadcrumb :items="items" />
</template>

<style scoped></style>
