<template>
  <header class="flex justify-between mb-6">
    <slot name="header_title">
      <div>
        <h2
          class="mb-1 text-xl leading-[22px] font-bold text-dark"
          :class="titleClass"
        >
          {{ title }}
        </h2>
        <p class="text-xs leading-normal font-normal text-gray-100">
          {{ subtitle }}
        </p>
      </div>
    </slot>
    <div
      class="flex-y-center max-w-[772px] w-full flex-wrap gap-x-5 gap-y-3 focus-within:border-green justify-end"
      :class="headClasses"
    >
      <div class="shrink-0 ml-auto flex justify-end">
        <slot name="beforeSearch" />
      </div>
      <div v-if="isSearch && !noSearch" class="w-full max-w-[250px]">
        <Input
          v-model="search"
          :input-class="inputClasses"
          :placeholder="$t(searchPlaceholder)"
          class="border border-gray-100"
          prefix-class="pr-2.5"
        >
          <template #prefix>
            <span class="icon-search text-gray-200 text-xl"></span>
          </template>
          <template #suffix>
            <button
              :class="{ '!opacity-100 !visible': search?.length }"
              class="w-5 h-5 flex-center bg-gray/[16%] rounded-full p-1 transition-200 group hover:bg-red opacity-0 invisible"
              @click="clearSearch"
            >
              <span
                class="icon-close text-gray text-[10px] transition-200 group-hover:text-white"
              />
            </button>
          </template>
        </Input>
      </div>
      <slot name="afterSearch" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import Input from "@/components/Form/Input/FInput.vue";

import { ref, watch } from "vue";
import { useRoute } from "vue-router";

interface Props {
  searchPlaceholder?: string;
  title?: string;
  titleClass?: string;
  subtitle?: string;
  noSearch?: boolean;
  inputClasses?: string | string[];
  isSearch?: boolean;
  headClasses?: string | string[];
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: "search",
});
const emit = defineEmits(["search"]);
const route = useRoute();
const search = ref(route.query.search || "");

function clearSearch() {
  search.value = "";
}

watch(
  () => search.value,
  () => {
    emit("search", search.value);
  }
);
//
// watch(
//   () => props?.search,
//   () => {
//     search.value = props?.search;
//   },
//   { immediate: true }
// );
</script>

<style scoped></style>
