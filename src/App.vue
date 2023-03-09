<script setup lang="ts">
import features, {IFeature} from "./routes/features";

const featureByCategory = features.reduce<Record<string, IFeature[]>>((acc, feature) => {
  const category = feature.category;
  if (!category)
    return acc;

  if (!acc[category])
    acc[category] = [];
  acc[category].push(feature);

  return acc;
}, {});
const items = Object.keys(featureByCategory).map(category => ({
  label: category,
  items: featureByCategory[category].map(feature => ({
    label: feature.name,
    to: feature.path,
  })),
}));
</script>

<template>
  <router-view></router-view>
</template>
