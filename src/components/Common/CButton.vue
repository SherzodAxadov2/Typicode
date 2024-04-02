<template>
  <button
    :class="[
      sizes[size],
      { '!pointer-events-none': loading },
      variants[variant],
      {
        'disabled:!pointer-events-none disabled:!bg-gray disabled:!text-gray-300':
          disabled,
      },
    ]"
    class="relative select-none transition-300 active:scale-95 leading-6"
    v-bind="{ type, disabled }"
  >
    <span
      :class="[
        {
          '!opacity-0': loading,
          'flex-center justify-center gap-2': text?.length,
          'flex-row-reverse': iconPosition === 'left',
        },
        mainClass,
      ]"
      class="text-center"
    >
      <slot name="icon" />
      <span
        v-if="text?.length"
        :class="[variantTexts[variant], { '!text-gray-300': disabled }]"
        class="whitespace-nowrap"
      >
        {{ text }}
      </span>
      <span
        v-if="icon?.length"
        :class="[icon, { 'text-base': size === 'md' }, variantTexts[variant]]"
      ></span>
    </span>
    <transition mode="out-in" name="fade">
      <span
        v-if="loading"
        class="absolute-center z-10 !inline-block w-max h-max loading transition-300"
      >
        <svg
          class="animate-spin"
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :fill="loaderFill"
            d="M18.6705 10C19.4048 10 20.0091 10.5978 19.9118 11.3256C19.7101 12.8333 19.1663 14.2813 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433284 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C5.71875 0.833744 7.16671 0.289884 8.6744 0.0882432C9.40217 -0.00909153 10 0.595234 10 1.32949C10 2.06375 9.39999 2.64679 8.67774 2.77904C7.69697 2.95865 6.75831 3.33706 5.92155 3.89617C4.71433 4.70281 3.77341 5.84932 3.21779 7.19071C2.66217 8.53211 2.51679 10.0081 2.80004 11.4322C3.0833 12.8562 3.78246 14.1642 4.80912 15.1909C5.83578 16.2175 7.14383 16.9167 8.56784 17.2C9.99186 17.4832 11.4679 17.3378 12.8093 16.7822C14.1507 16.2266 15.2972 15.2857 16.1038 14.0784C16.6629 13.2417 17.0414 12.303 17.221 11.3223C17.3532 10.6 17.9363 10 18.6705 10Z"
          />
        </svg>
      </span>
    </transition>
  </button>
</template>

<script lang="ts" setup>
import { TClassName } from "@/types/common";
import { TButtonSizes, TButtonVariants } from "@/types/components/button";
import { computed } from "vue";

interface Props {
  variant?: TButtonVariants;
  size?: TButtonSizes;
  loading?: boolean;
  mainClass?: TClassName;
  type?: "button" | "submit" | "reset";
  iconPosition?: "left" | "right";
  text?: string;
  icon?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  text: "Button",
});

const variants: Record<TButtonVariants, string> = {
  primary: "bg-primary !text-white hover:bg-primary/90 hover:!text-white",
  secondary: "bg-gray-800 !text-gray hover:bg-gray-900",
  info: "bg-gray !text-dark hover:bg-gray-100/20 hover:!text-dark",
  error: "bg-red-500/10 !text-red-500 hover:bg-red-500/20",
  success: "bg-[#0DB23B] !text-white hover:bg-primary/90 hover:!text-white",
  warning: "bg-red !text-white hover:bg-red/90",
  missing: "!bg-primary-100 !text-white hover:bg-primary/90 hover:!text-white",
  yellow: "bg-yellow-100 !text-yellow hover:bg-yellow/20",
};

const variantTexts: Record<TButtonVariants, string> = {
  primary: "text-white font-semibold text-sm",
  secondary: "text-gray font-semibold text-sm",
  info: "text-dark font-semibold text-sm",
  error: "text-red-500 font-semibold text-sm",
  success: "text-white font-semibold text-sm",
  warning: "text-white font-semibold text-sm",
  missing: "text-white font-semibold text-sm",
  yellow: "text-yellow font-semibold text-sm",
};

const sizes: Record<TButtonSizes, string> = {
  sm: "py-2 px-4 text-sm font-medium rounded-md",
  md: "py-[8px] px-5 font-semibold text-sm rounded-lg h-10",
  lg: "py-3 px-[22px] text-base font-semibold leading-[26px] rounded-[10px]",
};

const loaderFill = computed(() => {
  if (["outline", "outline-dark", "outline-primary"].includes(props.variant)) {
    return "#191F2E";
  }
  return "white";
});
</script>
