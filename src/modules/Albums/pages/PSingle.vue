<script setup lang="ts">
import CBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { useMounted } from "@/composables/useMounted";
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAlbumsStore } from "@/modules/Albums/store";
import { IAlbumSingle } from "@/modules/Albums/types";
import CPreloader from "@/components/CPreloader.vue";
import Gallery from "@/components/LightBox/CGallery.vue";

const { mounted } = useMounted();
const store = useAlbumsStore();
const route = useRoute();
const { t } = useI18n();
const albumList = computed(() => store.singleAlbums as IAlbumSingle[]);
const loading = ref(true);
const show = ref(false);
const index = ref<number>();
const routes = [
  {
    name: t("albums"),
    route: "/albums",
  },
  {
    name: t("album_single"),
    route: "/albums",
  },
];

onMounted(() => {
  store.fetchAlbumSingle(+route.params.id).then(() => (loading.value = false));
});

function getImage(idx: number) {
  index.value = idx;
  show.value = true;
}
</script>

<template>
  <div>
    <Teleport v-if="mounted" to="#header-breadcrumbs">
      <CBreadcrumb v-bind="{ routes }" />
    </Teleport>

    <main>
      <h2 class="text-xl leading-[22px] font-bold text-dark mb-8">
        {{ $t("album_single") }}
      </h2>

      <div class="grid grid-cols-6 gap-4">
        <template v-if="loading">
          <CPreloader
            v-for="i in 52"
            :key="i"
            width="100%"
            height="100px"
            border-radius="12px"
            v-bind="{ loading }"
          />
        </template>

        <template v-else-if="albumList?.length">
          <img
            v-for="(image, i) in albumList"
            :key="i"
            :src="image?.url"
            :alt="image?.title"
            class="cursor-pointer"
            @click="getImage(i)"
          />
        </template>
      </div>
    </main>

    <Gallery
      v-bind="{
        show,
        index,
        list: albumList,
      }"
      @close="show = false"
    />
  </div>
</template>

<style scoped></style>
