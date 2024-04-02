<template>
  <section
    class="section relative flex-center flex-col align-center max-h-screen h-screen overflow-hidden"
  >
    <div
      class="absolute flex-center flex-col align-center bg-cover max-h-screen h-screen overflow-hidden top-0 left-0 right-0 bottom-0 z-10"
    >
      <img src="/images/svg/404.svg" alt="404 image" />
      <h2
        class="mb-3 mt-[60px] text-center text-white text-[32px] leading-130 font-bold"
      >
        {{ $t("error_404") }}
      </h2>
      <p class="mb-8 text-center text-gray text-xl leading-130">
        {{ $t("error_404_description") }}
      </p>
      <div class="flex-center cursor-pointer">
        <router-link
          to="/"
          class="px-[18px] py-3 gap-2 text-white bg-primary rounded-[10px] hover:bg-primary-200 transition-300 cursor-pointer flex items-center z-10"
        >
          <span class="icon-home text-white" />
          {{ $t("back_to_home") }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.section {
  background: #080a15;
  backdrop-filter: blur(42px);
}
</style>
