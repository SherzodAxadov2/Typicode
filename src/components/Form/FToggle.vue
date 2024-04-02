<template>
  <label
    class="flex relative w-11 h-6 rounded-[48px] cursor-pointer transition-all duration-200"
    :class="value ? 'bg-green' : 'bg-gray-350'"
  >
    <input
      :checked="value"
      type="checkbox"
      id="_toggle"
      class="absolute w-px h-px opacity-0"
      @change="handleChange"
    />
    <span
      class="absolute w-5 h-5 rounded-full top-0.5 left-0.5 transition-all duration-200"
      :class="value ? 'translate-x-5 bg-white' : 'translate-x-0 bg-gray'"
    />
  </label>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
interface Props {
  modelValue: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const value = ref(false);

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  },
  { immediate: true }
);
const handleChange = (e) => {
  const target = e?.target;

  if (target === null) {
    return;
  }
  value.value = target.checked;
  emit("update:modelValue", value.value);
};
</script>
