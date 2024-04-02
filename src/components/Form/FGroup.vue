<template>
  <div class="flex flex-col gap-2 w-full">
    <div :class="wrapperClass" class="flex-center-between w-full">
      <Label v-bind="{ forText, label, labelClass }" />
      <slot name="labelOpposite" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Label from "@/components/Form/FLabel.vue";

interface Props {
  label: string;
  isRightLabel?: boolean;
  rightLabel?: boolean;
  tooltip?: boolean;
  tooltipText?: string;
  forText?: string;
  wrapperClass?: string;
  labelClass?: string;
}

withDefaults(defineProps<Props>(), {
  label: "",
  rightLabel: false,
});
</script>
