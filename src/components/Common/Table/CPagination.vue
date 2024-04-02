<template>
  <ul class="pagination flex-y-center gap-2">
    <li
      v-if="paginationButtons"
      class="group cursor-pointer"
      :class="`${itemClass} ${hasLast ? disableClass : ''}`"
    >
      <button :disabled="hasFirst" @click="prev">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.4721 4.47157C10.7324 4.21122 10.7324 3.78911 10.4721 3.52876C10.2117 3.26841 9.7896 3.26841 9.52925 3.52876L5.52925 7.52876C5.27686 7.78114 5.26803 8.18753 5.50922 8.45065L9.17588 12.4506C9.42468 12.7221 9.84639 12.7404 10.1178 12.4916C10.3892 12.2428 10.4076 11.8211 10.1588 11.5497L6.92341 8.02021L10.4721 4.47157Z"
            fill="#919299"
          />
        </svg>
      </button>
    </li>

    <li
      v-for="page in items"
      :key="page.label"
      class="hover:!bg-blue duration-200 group"
      :class="`${itemClass} ${page.active ? activeClass : '!text-white'} ${
        page.disable ? disableClass : ''
      }`"
    >
      <span
        v-if="page.disable"
        class="w-full h-full flex-center text-gray-300 duration-200 group-hover:!text-white text-sm font-medium"
      >
        ...
      </span>
      <button
        v-else
        class="w-full h-full text-gray-300 duration-200 group-hover:!text-white text-sm font-medium"
        @click="goto(page.label)"
        :class="{ '!text-white': page.active }"
      >
        {{ page.label }}
      </button>
    </li>

    <li
      v-if="paginationButtons"
      class="group cursor-pointer"
      :class="`${itemClass} ${hasLast ? disableClass : ''}`"
    >
      <button :disabled="hasLast" @click="next">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.52794 4.47157C5.26759 4.21122 5.26759 3.78911 5.52794 3.52876C5.78829 3.26841 6.2104 3.26841 6.47075 3.52876L10.4708 7.52876C10.7231 7.78114 10.732 8.18754 10.4908 8.45065L6.82412 12.4506C6.57532 12.7221 6.15361 12.7404 5.8822 12.4916C5.61079 12.2428 5.59245 11.8211 5.84124 11.5497L9.07659 8.02021L5.52794 4.47157Z"
            fill="#919299"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from "vue";
import { computed, onMounted, watch } from "vue";

interface Props {
  currentPage: number;
  total: number;
  limit: number;
  itemClass?: string;
  activeClass?: string;
  disableClass?: string;
  paginationButtons?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  itemClass:
    "rounded-md w-7 h-7 flex-center transition-300 text-sm leading-4 text-gray cursor-pointer",
  activeClass: "!bg-primary !text-white",
});

const emit = defineEmits(["change", "input"]);
const pageCount = computed(() => Math.ceil(props.total / props.limit));
const items = computed(() => {
  const valPrev = props.currentPage > 1 ? props.currentPage - 1 : 1; // for easier navigation - gives one previous page
  const valNext =
    props.currentPage < pageCount.value
      ? props.currentPage + 1
      : pageCount.value; // one next page
  const extraPrev = valPrev === 3 ? 2 : null;
  const extraNext =
    valNext === pageCount.value - 2 ? pageCount.value - 1 : null;
  const dotsBefore = valPrev > 3 ? 2 : null;
  const dotsAfter = valNext < pageCount.value - 2 ? pageCount.value - 1 : null;
  const output = [];
  for (let i = 1; i <= pageCount.value; i += 1) {
    if (
      [
        1,
        pageCount.value,
        props.currentPage,
        valPrev,
        valNext,
        extraPrev,
        extraNext,
        dotsBefore,
        dotsAfter,
      ].includes(i)
    ) {
      output.push({
        label: i,
        active: props.currentPage === i,
        disable: [dotsBefore, dotsAfter].includes(i),
      });
    }
  }
  return output;
});
const hasFirst = computed(() => props.currentPage === 1);
const hasLast = computed(() => props.currentPage === pageCount.value);
watch(
  () => props.currentPage,
  () => {
    emit("change");
  }
);
function prev() {
  if (!hasFirst.value) {
    emit("input", props.currentPage - 1);
  }
}
function goto(page: number) {
  if (props.currentPage !== page) {
    emit("input", page);
  }
}
function next() {
  if (!hasLast.value) {
    emit("input", props.currentPage + 1);
  }
}
// function last() {
//   if (!hasLast.value) {
//     emit("input", pageCount.value);
//   }
// }
onMounted(() => {
  if (props.currentPage > pageCount.value) {
    emit("change");
  }
});
</script>
