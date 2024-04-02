<template>
  <CDialog body-class="!max-w-[420px]" no-header v-bind="{ show }">
    <div class="p-5">
      <CRoundedIcon
        :color="color || '!text-red bg-red/20'"
        :icon="icon || 'icon-trash'"
      />
      <p
        class="text-center mt-5 text-xl leading-130 font-semibold text-dark-100"
      >
        {{ title }}
      </p>
      <p
        class="text-base leading-130 font-normal text-gray-700 text-center mt-2 max-w-[357px] mx-auto"
      >
        {{ subtitle }}
      </p>
      <div class="mt-7 flex-y-center gap-4">
        <CButton
          :text="$t('cancel')"
          class="w-full"
          variant="info"
          @click="$emit('close')"
        />
        <CButton
          :text="$t(submitText || 'delete')"
          :variant="variant || 'error'"
          class="w-full"
          v-bind="{ loading }"
          @click="$emit('submit')"
        />
      </div>
    </div>
  </CDialog>
</template>

<script lang="ts" setup>
import CDialog from "@/components/Common/Dialog/CDialog.vue";
import CRoundedIcon from "@/components/Common/CRoundedIcon.vue";
import CButton from "@/components/Common/CButton.vue";
import { TButtonVariants } from "@/types/components/button";

interface Props {
  title?: string;
  subtitle?: string;
  show?: boolean;
  loading?: boolean;
  icon?: string;
  color?: string;
  variant?: TButtonVariants;
  submitText?: string;
}

defineProps<Props>();
</script>
