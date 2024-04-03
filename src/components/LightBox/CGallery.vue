<template>
  <Modal
    v-bind="{ show }"
    no-header
    body-class="!bg-transparent !overflow-visible max-w-[782px]"
    has-close-icon
    @close="$emit('close')"
  >
    <div v-if="!loading" class="relative w-full">
      <button
        class="slider-prev w-12 h-12 rounded-full flex-center group backdrop-blur-sm bg-white/[12%] hover:!backdrop-blur-0 border border-white/[16%] hover:!bg-white transition-300 group absolute -left-16 absolute-y cursor-pointer"
      >
        <i
          class="icon-chevron-left text-3xl text-white transition-300 group-hover:text-red block"
        />
      </button>
      <Swiper
        v-if="list.length"
        v-bind="settings"
        :initial-slide="index"
        :thumbs="{ swiper: thumbsSwiper }"
      >
        <SwiperSlide v-for="(img, index) in list" :key="index" class="w-full">
          <div class="aspect-video relative w-full rounded-2xl overflow-hidden">
            <img
              :src="img?.url"
              alt="images"
              class="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        v-if="list.length"
        v-bind="thumbsSettings"
        class="mySwiper thumbs-swiper"
        :initial-slide="index"
        @swiper="setThumbsSwiper"
      >
        <SwiperSlide
          v-for="(img, index) in list"
          :key="index"
          class="mt-4 thumb"
        >
          <div class="relative cursor-pointer">
            <img
              class="object-cover aspect-video cursor-pointer rounded-lg overflow-hidden"
              :src="img?.url"
              alt="cover image"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <button
        class="slider-next w-12 h-12 rounded-full flex-center group backdrop-blur-sm bg-white/[12%] border border-white/[16%] hover:!bg-white hover:!backdrop-blur-0 hover:bg-transparent transition-300 group absolute -right-16 absolute-y cursor-pointer"
      >
        <i
          class="icon-chevron-left text-3xl text-white group-hover:text-red transition-300 block rotate-180"
        />
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import "swiper/css";
import "swiper/css/thumbs";

import type SwiperClass from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import Modal from "@/components/Common/CModal.vue";
import { IAlbumSingle } from "@/modules/Albums/types";
import { ref, watch } from "vue";

interface Props {
  index?: number;
  show?: boolean;
  list: IAlbumSingle[];
}
const props = defineProps<Props>();

defineEmits<{
  (e: "close"): void;
}>();

const loading = ref(true);
watch(
  () => props.show,
  () => {
    if (!props.show) {
      thumbsSwiper.value = undefined; // Reset thumbsSwiper when the component is hidden
    }
  }
);

watch(
  () => props.list,
  () => {
    if (props.list?.length) loading.value = false;
  },
  {
    immediate: true,
    deep: true,
  }
);

const thumbsSwiper = ref<SwiperClass>();

const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper;
};

const settings = {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  keyboard: { enabled: true },
  navigation: {
    nextEl: ".slider-next",
    prevEl: ".slider-prev",
  },
  thumbs: { swiper: thumbsSwiper.value },
  modules: [Thumbs, FreeMode, Navigation],
};
const thumbsSettings = {
  spaceBetween: 10,
  loop: true,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
  modules: [Thumbs, FreeMode],
};
</script>

<style scoped>
.thumbs-swiper .swiper-slide-thumb-active {
  border: 2px solid #dd3333 !important;
  border-radius: 12px;
  position: relative;
}

.thumbs-swiper .swiper-slide-thumb-active::before {
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(49, 49, 50, 0.32) 0%,
    rgba(49, 49, 50, 0.92) 100%
  );
}

.thumb div::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  top: 0;
  left: 0;
  z-index: 10;
  color: red;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(49, 49, 50, 0.32) 0%,
    rgba(49, 49, 50, 0.92) 100%
  );
}
.swiper-slide-thumb-active.thumb div::before {
  content: none !important;
}
</style>
