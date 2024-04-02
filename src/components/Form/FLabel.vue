<template>
  <label
    class="text-sm text-gray-100 font-medium"
    :class="labelClass"
    :for="forText"
  >
    {{ label }}
  </label>
</template>
<script setup lang="ts">
interface Props {
  label: string;
  labelClass?: string;
  forText?: string;
}

withDefaults(defineProps<Props>(), {});
</script>
