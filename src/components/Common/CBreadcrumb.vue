<template>
  <div class="flex items-center">
    <div
      v-for="(route, index) in routes"
      :key="index"
      class="flex items-center shrink-0"
      :class="[checkLastRoute(index), `text-[${textColor}]`]"
    >
      <RouterLink
        v-if="route.link"
        class="transition duration-500 text-2xs"
        :to="route.route"
      >
        {{ route.name }}
      </RouterLink>
      <p v-else-if="route.disabled" class="text-2xs">{{ route.name }}</p>
      <RouterLink
        v-else
        class="transition duration-500 text-2xs"
        :to="route.route"
      >
        {{ route.name }}
      </RouterLink>
      <span
        v-if="index !== routes.length - 1"
        class="mx-2 w-1 h-1 bg-primary rounded-full"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface IRoute {
  name: string;
  route: string;
  target?: boolean;
  link?: boolean;
  disabled?: boolean;
}

export interface Props {
  routes: IRoute[];
  hoverColor: string;
  textColor: string;
}
const props = withDefaults(defineProps<Props>(), {
  hoverColor: "#94A8AA",
  textColor: "#061018",
});
const checkLastRoute = (index: number) => {
  if (index === props.routes.length - 1) {
    return "font-medium !text-gray-300 cursor-not-allowed pointer-events-none";
  } else {
    return "font-medium text-dark hover:text-gray-300 cursor-pointer";
  }
};
</script>
