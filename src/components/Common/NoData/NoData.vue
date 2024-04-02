<template>
  <div class="flex-center flex-col py-12">
    <img :src="image" alt="no-data-image" class="mx-auto min-h-[125px]" />
    <slot name="text" />
    <p
      v-if="title"
      :class="titleClass"
      class="text-xl leading-130 font-medium text-dark text-center md:max-w-[40%] mx-auto mt-5"
    >
      {{ title }}
    </p>
    <p
      v-if="subtitle"
      :class="subtitleClass"
      class="text-base leading-130 font-normal text-gray-300 text-center mx-auto mt-2"
    >
      {{ subtitle }}
    </p>
    <div :class="slotClasses" class="mt-8" v-if="buttonText">
      <CButton
        :class="buttonCustomClass"
        :text="buttonText"
        class="mt-6 gap-2"
        icon="icon-plus w-[20px]"
        icon-position="left"
        variant="info"
        @click="$emit('submit')"
      />
      <div>
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CButton from "@/components/Common/CButton.vue";

interface Props {
  image: string;
  subtitle?: string;
  subtitleClass?: string;
  title: string;
  titleClass?: string;
  buttonText?: string;
  buttonCustomClass?: string;
  slotClasses?: string;
}

defineProps<Props>();
</script>
