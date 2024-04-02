<template>
  <div>
    <RouterView v-slot="{ Component }">
      <div :key="detectLayout">
        <component :is="detectLayout">
          <Component :is="Component" />
        </component>
      </div>
    </RouterView>
    <CDialog :show="show" no-header title="">
      <div class="text-dark text-xl font-medium text-center py-14">
        {{ $t("using_chrome") }}
      </div>
    </CDialog>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import LDefault from "@/layout/Dashboard/LDefault.vue";
import LError from "@/layout/Error/LError.vue";
import CDialog from "@/components/Common/Dialog/CDialog.vue";
// Setup
const route = useRoute();
const layouts = {
  default: LDefault,
  error: LError,
};
const show = ref(false);

const detectLayout = computed(() => {
  return layouts[route.meta.layout as string];
});
</script>
