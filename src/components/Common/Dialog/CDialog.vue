<template>
  <Teleport to="body">
    <div
      :class="[wrapperClass, { '!opacity-100 !visible': show }]"
      data-modal="wrapper"
      class="items-center p-3 fixed w-full h-full bg-black/50 flex justify-center z-[100] top-0 left-0 invisible opacity-0 transition-all duration-300"
    >
      <Transition name="modal" mode="out-in">
        <div
          v-if="show"
          class="bg-white w-full max-w-xl shadow-xl relative max-h-[90vh] my-4 rounded-xl"
          :class="[
            bodyClass,
            { animated: animationIn },
            { 'overflow-y-auto': !isFlow },
          ]"
        >
          <div
            v-if="!noHeader"
            class="flex items-center border-b border-solid border-blue-50 px-6 pb-2.5 pt-4 bg-white rounded-t-xl"
            :class="[headerStyle]"
          >
            <slot name="header">
              <h3
                class="w-full text-xl text-dark leading-130 font-semibold"
                :class="titleStyle"
              >
                {{ title }}
              </h3>
              <button
                class="text-2xl w-7 h-7 rounded-full text-white shrink-0 flex-center transition-300 hover:bg-transparent active:scale-95 group"
                @click="$emit('close')"
              >
                <span
                  class="icon-close text-gray-300 group-hover:text-red transition-300 text-base"
                />
              </button>
            </slot>
          </div>
          <button
            v-if="noHeader && hasCloseIcon"
            class="text-3xl w-7 h-7 absolute text-gray-100 top-6 right-5 rounded-full shrink-0 flex-center transition-300 hover:text-red hover:bg-transparent active:scale-95 z-40"
            @click="$emit('close')"
          >
            <span class="icon-close" />
          </button>
          <slot />
          <slot name="footer" />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

interface Props {
  show?: boolean;
  isFlow?: boolean;
  title?: string;
  wrapperClass?: string | string[];
  modalClass?: string | string[];
  noHeader?: boolean;
  disableOuterClose?: boolean;
  bodyClass?: string | string[];
  hasCloseIcon?: boolean;
  titleStyle?: string;
  headerStyle?: string;
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

// function handleOuterClick(e: Event) {
//   const target = e.target as HTMLElement;
//   if (target.dataset?.modal == "wrapper") {
//     emit("outer-click");
//     if (!props.disableOuterClose) {
//       emit("close");
//     } else {
//       animationIn.value = true;
//       setTimeout(() => {
//         animationIn.value = false;
//       }, 500);
//     }
//   }
// }

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
