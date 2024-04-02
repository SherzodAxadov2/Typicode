<template>
  <div ref="select" class="relative">
    <!--  SELECTED OPTION  -->
    <div
      :class="[
        selectedOptionStyles,
        { '!border-red': error },
        { 'border !border-primary !bg-transparent': showOptions },
      ]"
      class="bg-white rounded-lg pl-4 pr-3 py-2.5 cursor-pointer border border-dark/[4%] flex items-center justify-between transition-300"
      @click="toggleSelect(!showOptions)"
    >
      <slot :value="value" name="selectedOption">
        <div
          v-if="isSearchable"
          :class="parentInputClasses"
          class="flex items-center"
        >
          <input
            v-model="searchValue"
            :class="inputClasses"
            :placeholder="placeholder"
            class="border-0 outline-none text-dark font-medium text-sm !leading-130 placeholder:text-dark !placeholder:font-normal placeholder:leading-130 placeholder:text-sm"
            type="text"
          />
        </div>

        <div v-else>
          <div
            v-if="!value"
            :class="labelClass"
            class="text-dark font-normal text-sm !leading-130"
          >
            {{ placeholder }}
          </div>
          <div
            v-else
            :class="labelClass"
            class="text-dark text-sm !leading-130 line-clamp-1"
          >
            {{ value[labelKey] || value }}
          </div>
        </div>
        <slot name="chevron">
          <span
            :class="{ '-rotate-180 !text-blue !mt-0': showOptions }"
            class="icon-chevron text-[#667779] transition-all h-max duration-200 ml-[6px] inline-block text-base"
          ></span>
        </slot>
      </slot>
    </div>
    <!--  OPTIONS  -->
    <Transition mode="out-in" name="select">
      <div
        v-if="showOptions && !noOptions"
        :key="showOptions"
        :class="fromTop ? 'bottom-[55px]' : 'top-full'"
        class="absolute min-w-full w-[max-content] p-[8px] bg-white border border-gray rounded-md z-40 translate-y-3 overflow-hidden max-h-[250px] overflow-y-scroll shadow-custom_select"
      >
        <slot name="options">
          <template v-if="options?.length">
            <div
              v-for="(option, key, idx) in search(searchValue)"
              :key="idx"
              class="px-3 py-[8px] transition-all duration-200 hover:bg-[#EDF0F2] rounded-[4px] cursor-pointer"
              :class="{
                'bg-[#EDF0F2]': isActive(option),
              }"
              @click="onSelect(option)"
            >
              <slot :index="idx" :option="option" name="option">
                <div class="flex-y-center gap-2 justify-between">
                  <p class="text-dark text-2xs !leading-130 mr-3">
                    {{ option[labelKey] }}
                  </p>
                  <i
                    v-show="isChecked && isActive(option)"
                    class="icon-checked text-base text-green"
                  />
                </div>
              </slot>
            </div>
          </template>
          <template v-else>
            <div class="flex-y-center gap-2">
              <p class="text-dark-100 text-xs !leading-130">
                {{ $t("no_results") }}
              </p>
            </div>
          </template>
          <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full"></div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, useIntersectionObserver } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export type TOption = string | number | { [key: string]: string | number };

export interface Props {
  error?: boolean;
  modelValue: TOption;
  options: TOption[];
  labelKey: string;
  valueKey: string;
  labelClass?: string;
  selectedOptionStyles?: string;
  placeholder: string;
  infiniteScroll?: boolean;
  isSearchable?: boolean;
  inputClasses?: string;
  parentInputClasses?: string;
  isChecked?: boolean;
  noOptions?: boolean;
  fromTop?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  labelKey: "name",
  valueKey: "id",
  placeholder: "Выберите вариант",
});

const emit = defineEmits<{
  (e: "on-toggle", value: boolean): void;
  (e: "update:modelValue", value: boolean): void;
  (e: "infinite-scroll"): void;
  (e: "on-select", value: TOption): void;
  (e: "load"): void;
}>();

const showOptions = ref(false);
const target = ref(null);
const targetIsVisible = ref(false);
const searchValue = ref("");
const value = ref(findOption(props.modelValue));
const searchingResults = ref<TOption[]>([]);
const activeOption = ref<TOption>();

onMounted(() => {
  if (props.noOptions) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        toggleSelect(!showOptions.value);
      }
    });
  }
});

const search = (val: string) => {
  if (!props.isSearchable || val.length < 1) return props.options;

  searchingResults.value = props.options.filter((option) => {
    return option[props.labelKey].toLowerCase().includes(val.toLowerCase());
  });

  return searchingResults.value;
};

watch(
  () => searchValue.value,
  (val) => {
    search(val);
  },
  { deep: true }
);

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue;
  emit("on-toggle", showOptions.value);
}

function findOption(option: TOption) {
  if (!option) return;
  return props.options?.find(
    (o) => o === option || o[props.valueKey] === option
  );
}

function onSelect(option: TOption) {
  value.value = option;
  activeOption.value = option;
  toggleSelect(false);
  emit("update:modelValue", option[props.valueKey]);
  emit("on-select", option);
}

const select = ref();
onClickOutside(select, () => toggleSelect(false));

function isActive(option: TOption) {
  return (
    option === value.value ||
    value.value?.[props.valueKey] == option?.[props.valueKey] ||
    option?.[props.valueKey] == value.value
  );
}

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting;
    if (isIntersecting) {
      emit("load");
    }
  }
);

// function checkTop() {
//   const bounds = select.value.getBoundingClientRect();
//   const distanceToBottom = window.innerHeight - bounds.bottom;
//   const threshold = 300;
//   fromTop.value = distanceToBottom < threshold;
// }
watch(
  () => targetIsVisible.value,
  (newValue) => {
    if (newValue) {
      emit("infinite-scroll");
    }
  }
);
watch(
  () => props.modelValue,
  (val) => {
    if (val?.name && Object.keys(val).length) {
      value.value = val;
      searchValue.value = val[props.labelKey];
    } else {
      value.value = findOption(props.modelValue);
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => props.options,
  (val) => {
    let firstVal = {
      [props.labelKey]: props.placeholder,
      [props.valueKey]: "",
    };
    if (val?.length) {
      console.log(val, "it is val", firstVal);
      // value.value = [firstVal, ...value.value];
      value.value = findOption(props.modelValue);
    }
  },
  { deep: true }
);

watch(
  () => value.value,
  (val) => {
    if (val) {
      searchValue.value = val[props.labelKey];
    }
  }
);
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
