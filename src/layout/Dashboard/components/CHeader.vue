<template>
  <header
    class="w-full bg-white py-4 px-6 z-20 flex items-center justify-between sticky top-0 header-shadow"
  >
    <div id="header-breadcrumbs"></div>

    <nav class="flex w-full h-full items-center gap-6 justify-end">
      <slot name="before-links" />

      <ul class="flex gap-x-2">
        <li v-for="(link, index) in links" :key="index">
          <RouterLink
            :class="{
              'bg-gray-200 !text-blue-500': link.to === activeRoute,
            }"
            :to="link.to"
            class="text-gray-300 px-3 py-2 inline-block text-sm transition-all duration-200 hover:bg-gray-200 rounded-md"
            >{{ link.title }}
          </RouterLink>
        </li>
      </ul>

      <slot name="after-links"></slot>

      <CLanguageSwitcher />
      <!--      <CProfileDropdown-->
      <!--        v-if="user?.id"-->
      <!--        :profile-items="profileItems"-->
      <!--        :user="user"-->
      <!--      />-->
    </nav>
  </header>
</template>
<script lang="ts" setup>
// import CProfileDropdown from "@/layout/Dashboard/components/CProfileDropdown.vue";
import { useI18n } from "vue-i18n";
import CLanguageSwitcher from "@/components/CLanguageSwitcher.vue";

const { t } = useI18n();
interface Props {
  links?: {
    title: string;
    to: string;
  }[];
  activeRoute?: string;
}

defineProps<Props>();

const profileItems = [
  {
    title: t("help"),
    event: "on-profile",
  },
];
</script>

<style scoped>
.header-shadow {
  box-shadow: 0 -4px 58px #0000000f !important;
}
</style>
