<template>
  <div class="relative flex-center-between bg-transparent max-w-[343px]">
    <div class="flex-y-center w-full justify-between pr-3">
      <div class="flex-y-center px-3 py-4">
        <img :src="images[type]" alt="icon" />
        <div class="ml-2">
          <p class="text-white font-medium text-xs leading-130">
            {{ title }}
          </p>
        </div>
      </div>
      <p
        class="icon-close text-gray-200 cursor-pointer hover:scale-105 transition-300 text-sm"
      ></p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  type: "success" | "error" | "warning" | "info";
  title: string;
}

defineProps<Props>();
const images = computed(() => {
  return {
    success: "/images/svg/toast/success.svg",
    error: "/images/svg/toast/error.svg",
    warning: "/images/svg/toast/warning.svg",
    info: "/images/svg/toast/info.svg",
  };
});
</script>
<style></style>
