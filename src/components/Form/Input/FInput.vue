<template>
  <div
    :class="[
      inputClass,
      'transition-200 h-10 inline-flex items-center justify-start relative bg-gray rounded-lg border border-transparent overflow-hidden w-full p-2.5 px-3 ',
      error
        ? '!border-red bg-red-100'
        : 'focus-within:bg-white focus-within:!border-primary',
    ]"
  >
    <span :class="[prefixClass]">
      <slot name="prefix" />
    </span>
    <input
      :value="modelValue"
      v-bind="{
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        id,
      }"
      :readonly="!autocomplete"
      :class="[
        inputClass,
        'font-normal text-sm leading-130 text-dark placeholder:text-gray-200 bg-transparent flex-grow outline-none !pr-3',
      ]"
      class="w-full !pr-3"
      ref="kInput"
      @input="handleInput"
      @change="$emit('change')"
      @blur="emit('blur')"
      @focus="emit('focus')"
      @keyup.enter="$emit('enter')"
    />

    <span :class="[suffixClass]">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TClassName } from "@/types/common";

export interface Props {
  id?: string;
  type?: string;
  placeholder?: string;
  modelValue?: number | string;
  disabled?: boolean;
  error?: boolean;
  maxlength?: number;
  minlength?: number;
  max?: number;
  min?: number;
  inputClass?: TClassName;
  prefixClass?: TClassName;
  suffixClass?: TClassName;
  autocomplete?: boolean;
  readonly?: boolean;
  mask?: any;
}

interface Emits {
  (e: "focus"): void;
  (e: "blur"): void;
  (e: "update:modelValue", value: Props["modelValue"]): void;
  (e: "change"): void;
  (e: "enter"): void;
}
const emit = defineEmits<Emits>();

const handleInput = (e: { target: HTMLInputElement }) => {
  emit("update:modelValue", e.target.value);
};

const kInput = ref();
defineExpose({ kInput });

withDefaults(defineProps<Props>(), {
  type: "text",
  maxlength: 199,
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: true,
});
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
/* Apply styles to autofill input field */
input:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill:focus-visible,
input:-webkit-autofill:hover {
  background-color: transparent !important;
  border: none;
  border-radius: 8px !important;
  color: #040e1a !important;
  -webkit-text-fill-color: #040e1a !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  transition: background-color 5000s ease-in-out 0s; /* delay the change of input background color */
}

input:-moz-placeholder {
  color: #040e1a !important;
}

input:-ms-input-placeholder {
  color: #040e1a !important;
}
</style>
