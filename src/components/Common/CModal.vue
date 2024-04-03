<template>
  <Teleport to="body">
    <div
      :class="[wrapperClass, { '!opacity-100 !visible': show }]"
      class="fixed w-full h-full bg-dark/70 flex justify-center z-[100] top-0 left-0 invisible opacity-0 transition-all duration-300 items-center p-3"
      data-modal="wrapper"
      @click="handleOuterClick"
    >
      <Transition mode="out-in" name="modal">
        <div
          v-if="show"
          :class="[bodyClass, { animated: animationIn }]"
          class="bg-white w-full lg:max-w-[782px] shadow-xl relative max-h-screen md:overflow-y-auto rounded-3xl"
        >
          <div
            v-if="!noHeader"
            :class="[headerStyle]"
            class="flex items-center border-b border-solid border-gray-200 p-4 pb-3 sm:pb-5 sm:p-5 rounded-t-2xl"
          >
            <slot name="header">
              <CPreloader
                width="300px"
                height="36px"
                v-bind="{ loading }"
                border-radius="12px"
                preloader-class="mb-3 block w-full"
              >
                <h3
                  :class="titleStyle"
                  class="w-full text-lg md:text-2xl text-dark leading-6 font-bold"
                >
                  {{ title }}
                </h3>
              </CPreloader>
              <button
                class="text-3xl ml-auto text-right w-8 h-8 rounded-full text-white shrink-0 flex-center transition-300 bg-transparent active:scale-95 group"
                @click="$emit('close')"
              >
                <span
                  class="icon-close text-xl sm:text-3xl text-gray group-hover:text-red transition-300"
                />
              </button>
            </slot>
          </div>
          <button
            v-if="noHeader && hasCloseIcon"
            class="absolute -top-8 lg:-top-10 -right-2 lg:-right-14 active:scale-95 group duration-200 rounded-full w-7 md:w-[38px] h-7 md:h-[38px] flex-center bg-white/10 border border-white/[16%] hover:!bg-white"
            @click="$emit('close')"
          >
            <span
              class="icon-close text-lg md:text-2xl text-white group-hover:text-red transition-300"
            />
          </button>
          <slot />
          <slot name="footer" />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, withDefaults, defineEmits, defineProps } from "vue";
import { onMounted, watch } from "vue";
import CPreloader from "@/components/CPreloader.vue";

interface Props {
  show?: boolean;
  title?: string;
  wrapperClass?: string | string[];
  modalClass?: string | string[];
  noHeader?: boolean;
  disableOuterClose?: boolean;
  bodyClass?: string | string[];
  hasCloseIcon?: boolean;
  titleStyle?: string;
  headerStyle?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Modal title",
  titleStyle: "",
  headerStyle: "",
  wrapperClass: "",
  bodyClass: "",
  modalClass: "",
});

interface Emits {
  (e: "close"): void;

  (e: "outer-click"): void;
}

const emit = defineEmits<Emits>();
const animationIn = ref(false);

function handleOuterClick(e: Event) {
  const target = e.target as HTMLElement;
  if (target.dataset?.modal == "wrapper") {
    emit("outer-click");
    if (!props.disableOuterClose) {
      emit("close");
    } else {
      animationIn.value = true;
      setTimeout(() => {
        animationIn.value = false;
      }, 500);
    }
  }
}

watch(
  () => props.show,
  (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
);
onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !props.disableOuterClose) {
      emit("close");
    }
  });
});
</script>

<style scoped>
@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-enter-active {
  animation: modal 0.3s ease-in-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in-out reverse;
}

@keyframes mobile-modal {
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-modal-enter-active {
  animation: mobile-modal 0.5s ease-in-out;
}

.mobile-modal-leave-active {
  animation: mobile-modal 0.5s ease-in-out reverse;
}

.animated {
  animation: horizontal-shaking 0.4s ease-in-out;
}
</style>

<style>
.close-wrapper {
  fill: rgba(255, 255, 255, 0.1);
  stroke-width: 1px;
  stroke: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px);
}
</style>
