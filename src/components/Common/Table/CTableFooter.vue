<template>
  <div v-if="!noFooter" class="w-full flex-center-between gap-5 pt-4">
    <slot name="beforePagination" />

    <CommonPageLimitChange
      v-if="total > 5"
      v-model:itemsPerPage="itemsCountInTable"
    />

    <CommonPagination
      v-if="totalPages > 1"
      :active-class="paginationClasses"
      :item-class="paginationClasses"
      pagination-buttons
      v-bind="{ total, currentPage, limit }"
      @input="$emit('page-change', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import CommonPagination from "@/components/Common/Table/CPagination.vue";
import CommonPageLimitChange from "@/components/Common/Table/CPageLimitChange.vue";
import { computed, ref, WritableComputedRef } from "vue";

interface Props {
  total?: number;
  limit: number;
  currentPage: number;
  itemsPerPage: number;
  paginationClasses?: string;
  activePaginationClasses?: string;
  noFooter?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["itemsPerPage", "page-change"]);

const totalPages = computed(() => {
  if (props.total < props.limit) {
    return 1;
  } else {
    return props.total / props.limit;
  }
});
const inputItemsPerPage = ref(10);

const itemsCountInTable: WritableComputedRef<number> = computed({
  get(): number {
    return props.itemsPerPage;
  },
  set(value: number): void {
    inputItemsPerPage.value = value;
    emit("itemsPerPage", value);
  },
});
</script>

<style scoped></style>
