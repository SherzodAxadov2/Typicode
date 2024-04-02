<template>
  <div class="h-8 flex-y-center gap-2">
    <p class="text-xs leading-20 font-normal text-dark-100">{{ $t("show") }}</p>
    <Select
      selected-styles="!text-dark-100 mr-1"
      selected-option-styles="!py-1.5 !px-2.5 !rounded-md  text-sm leading-normal !bg-gray gap-1"
      v-bind="{ options }"
      value-key="value"
      from-top
      :disabled="disabled"
      label-key="value"
      v-model="itemsCountInTable"
    >
    </Select>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from "vue";
import { computed, onMounted, ref, WritableComputedRef } from "vue";
import Select from "@/components/Form/Select/FSelect.vue";

interface Props {
  itemsPerPage: number;
  itemsPerPageDropdownEnabled?: {
    type: boolean;
    required: false;
    default: true;
  };
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
});
const emit = defineEmits(["update:itemsPerPage"]);

const inputItemsPerPage = ref<number>(10);

onMounted(() => {
  inputItemsPerPage.value = props.itemsPerPage;
});

const itemsCountInTable: WritableComputedRef<number> = computed({
  get(): number {
    return props.itemsPerPage;
  },
  set(value: number): void {
    emit("update:itemsPerPage", value);
  },
});

const options = [
  {
    value: 10,
  },
  {
    value: 15,
  },
  {
    value: 20,
  },

  {
    value: 50,
  },
];
</script>
