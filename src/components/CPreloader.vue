<template>
  <transition :key="loading" name="skeleton" mode="out-in">
    <div :key="loading" v-if="loading">
      <div
        key="loading"
        class="shrink-0"
        :class="preloaderClass"
        :style="{
          height: height,
          width: width,
        }"
      >
        <span class="skeleton" :style="shimmerStyles" />
      </div>
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </transition>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: "30px",
    },
    width: {
      type: [String, Number],
      default: "100%",
    },
    line: {
      type: [String, Number],
      default: 1,
    },
    borderRadius: {
      type: [String, Number],
      default: "4px",
    },
    preloaderClass: {
      type: [String, Array],
      default: () => "",
    },
    circle: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "https://picsum/photos/300/300",
    },
  },
  computed: {
    shimmerStyles() {
      return {
        "--width": this.width,
        "--height": this.height,
        "--border-radius": this.circle ? "50%" : this.borderRadius,
      };
    },
  },
};
</script>

<style scoped>
.skeleton {
  background-color: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-size: var(--width) var(--height);
  display: inline-block;
  position: relative;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
}

.dark .skeleton {
  background: linear-gradient(
    to right,
    #25323d 10%,
    #2e3c48 35.78%,
    #25323d 73.28%
  ) !important;
}

@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
</style>
