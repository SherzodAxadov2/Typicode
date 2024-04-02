<template>
  <div
    :class="[isOpen ? 'w-[265px]' : 'w-[75px]']"
    class="h-screen transition-300 shrink-0"
  />
  <div
    :class="[isOpen || hovered ? 'w-[265px]' : 'w-[75px]']"
    class="h-screen bg-dark transition-300 fixed flex flex-col justify-between z-30 overflow-hidden"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div
      class="absolute w-full h-[136px] bg-primary/60 -top-[56px] blur-[99px] z-10"
    ></div>
    <div
      class="absolute top-[77px] left-0 w-full h-[620px] before:absolute before:left-0 before:top-[-50px] before:h-[620px] before:w-full z-[1] before:z-0 before:bg-no-repeat before:bg-cover"
    ></div>
    <div class="z-20">
      <div
        class="w-full px-4 py-3 flex items-center justify-center border-b border-solid border-white/30 bg-transparent"
      >
        <div
          :class="{ 'opacity-0 invisible !w-0': !isOpen && !hovered }"
          class="relative overflow-hidden transition-300 w-[211px]"
        >
          <RouterLink to="/" class="text-white text-2xl font-bold">
            Typicode
            <!--            <img alt="EBB" class="h-5" src="/images/svg/logo_light.svg" />-->
          </RouterLink>
        </div>
        <div
          class="cursor-pointer w-6 h-6 flex items-center justify-center transition-300"
          @click="toggleSidebar"
        >
          <span
            :class="{ '!rotate-180': !isOpen }"
            class="flex items-center transition-300"
          >
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7071 6.70711C13.0976 6.31658 13.0976 5.68342 12.7071 5.29289C12.3166 4.90237 11.6834 4.90237 11.2929 5.29289L5.29289 11.2929C4.91431 11.6715 4.90107 12.2811 5.26285 12.6757L10.7628 18.6757C11.136 19.0828 11.7686 19.1103 12.1757 18.7372C12.5828 18.364 12.6103 17.7314 12.2372 17.3243L7.38414 12.0301L12.7071 6.70711Z"
                fill="white"
              />
              <path
                d="M19.7071 6.70711C20.0976 6.31658 20.0976 5.68342 19.7071 5.29289C19.3166 4.90237 18.6834 4.90237 18.2929 5.29289L12.2929 11.2929C11.9143 11.6715 11.9011 12.2811 12.2628 12.6757L17.7628 18.6757C18.136 19.0828 18.7686 19.1103 19.1757 18.7372C19.5828 18.364 19.6103 17.7314 19.2372 17.3243L14.3841 12.0301L19.7071 6.70711Z"
                fill="white"
                opacity="0.4"
              />
            </svg>
          </span>
        </div>
      </div>
      <div class="flex flex-col py-5 gap-1">
        <div v-for="(menuItem, index) in menu" :key="index">
          <RouterLink
            v-if="!menuItem?.sub?.length"
            :class="{ '!bg-primary/[0.08]': location === menuItem?.route }"
            :to="menuItem?.route"
            class="py-3 px-5 hover:bg-blue-200/10 transition-300 flex items-center group gap-3 h-12"
            @click="openMenu(index)"
          >
            <i
              :class="[
                menuItem?.svgIcon,
                {
                  '!text-primary': location === menuItem?.route,
                },
              ]"
              class="text-xl text-gray-100 group-hover:!text-primary transition-300"
            />
            <CollapseTransition :duration="300" dimension="width">
              <p
                v-if="isOpen || hovered"
                :class="{
                  'font-semibold': location === menuItem?.route || isOpen,
                }"
                class="text-sm text-white font-normal whitespace-nowrap"
              >
                {{ $t(menuItem?.heading) }}
              </p>
            </CollapseTransition>
          </RouterLink>
          <!-- Todo: refactor class binding -->
          <div
            v-else
            :class="[
              index === openIndex || isActiveSub(menuItem?.sub)
                ? 'bg-primary/10'
                : '',
            ]"
            class="transition-300 cursor-pointer"
          >
            <div
              class="py-3 px-5 flex hover:bg-primary/10 transition-300 items-center justify-between gap-3 h-12 group"
              @click="openMenu(index)"
            >
              <div class="flex items-center gap-3">
                <i
                  :class="[
                    menuItem?.svgIcon,
                    {
                      '!text-primary':
                        location === menuItem?.route ||
                        isActiveSub(menuItem?.sub),
                    },
                  ]"
                  class="text-xl text-gray-100 group-hover:!text-primary transition-300"
                />
                <CollapseTransition :duration="300" dimension="width">
                  <p
                    v-if="isOpen || hovered"
                    :class="{ 'font-semibold': isActiveSub(menuItem?.sub) }"
                    class="text-sm text-white font-normal whitespace-nowrap"
                  >
                    {{ $t(menuItem?.heading) }}
                  </p>
                </CollapseTransition>
              </div>
              <i
                v-if="isOpen || hovered"
                :class="[
                  {
                    '!-rotate-90 ': index !== openIndex,
                  },
                ]"
                class="icon-chevron text-xl leading-5 transition-300 text-blue/20"
              />
            </div>
            <CollapseTransition>
              <div
                v-if="
                  (menuItem?.sub?.length && index === openIndex && isOpen) ||
                  (index === openIndex && !isOpen && hovered)
                "
              >
                <RouterLink
                  v-for="(subMenuItem, idx) in menuItem?.sub"
                  :key="idx"
                  :to="subMenuItem?.route"
                  class="p-3 pl-6 transition-300 flex items-center gap-3 h-12 text-gray-700 group"
                >
                  <span
                    :class="{
                      '!text-white': location === subMenuItem?.route,
                    }"
                    class="group-hover:bg-white transition-300 w-3 h-[2px] bg-gray-200"
                  />
                  <CollapseTransition :duration="300" dimension="width">
                    <p
                      v-if="isOpen || hovered"
                      :class="{
                        '!text-white font-semibold':
                          location === subMenuItem?.route,
                      }"
                      class="text-sm font-normal group-hover:text-white transition-300 whitespace-nowrap"
                    >
                      {{ $t(subMenuItem?.heading) }}
                    </p>
                  </CollapseTransition>
                </RouterLink>
              </div>
            </CollapseTransition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { computed, onMounted, ref } from "vue";

import { IMenu, menu } from "@/data/menu";
import { useRoute } from "vue-router";

const openIndex = ref<number>();
const isOpen = ref(true);
const hovered = ref(false);
const route = useRoute();

const location = computed(() => route.path);

function openMenu(index?: number) {
  if (openIndex.value === index) {
    openIndex.value = undefined;
  } else {
    openIndex.value = index;
  }
}

function checkIndexActive() {
  menu.forEach((el, index) => {
    if (el?.sub?.length) {
      el?.sub?.forEach((elSub) => {
        if (elSub?.route === location.value) {
          openIndex.value = index;
        }
      });
    }
  });
}

onMounted(() => {
  setTimeout(() => {
    checkIndexActive();
  }, 100);
});

function isActiveSub(arr?: IMenu[]) {
  return arr?.find((el) => el?.route === location.value);
}

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;

  if (!isOpen.value) {
    hovered.value = false;
    isOpen.value = false;
  }
};
</script>
