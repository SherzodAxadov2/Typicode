<script setup lang="ts">
import CBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { useMounted } from "@/composables/useMounted";

import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTableFetch } from "@/composables/useTableFetch";
import CTableWrapper from "@/components/Common/Table/CTableWrapper.vue";
import { exchangeActions, modelHead } from "@/modules/Albums/data";
import { useAlbumsStore } from "@/modules/Albums/store";
import { IAlbum, IUser } from "@/modules/Albums/types";
import CActionsDropdown from "@/components/Common/Dropdown/CActionsDropdown.vue";

const store = useAlbumsStore();
const { mounted } = useMounted();
const { t } = useI18n();
const loading = ref(true);
const routes = computed(() => [
  {
    name: t("albums"),
    route: "/albums",
  },
]);
const albums = computed(() => store.albums as IAlbum[]);
const users = computed(() => store.users as IUser[]);

const { paginationData, onSearch, onPageChange, onChangeLimit } =
  useTableFetch("/albums/a");

onMounted(() => {
  store.fetchAlbums().finally(() => (loading.value = false));
  store.fetchUsers();
});

function getUser(id: number) {
  let user = users.value?.find((el) => el?.id === id);
  if (user) {
    return user?.name;
  }
  return;
}
</script>

<template>
  <div>
    <Teleport v-if="mounted" to="#header-breadcrumbs">
      <CBreadcrumb v-bind="{ routes }" />
    </Teleport>

    <main>
      <!--      <pre>{{ users }}</pre>-->
      <CTableWrapper
        :current-page="paginationData?.currentPage"
        :data="albums"
        :head="modelHead"
        :items-per-page="10"
        :limit="paginationData?.defaultLimit"
        :loading="loading"
        :subtitle="t('albums_number', { count: albums?.length ?? 0 })"
        :title="$t('albums')"
        :total="paginationData?.total"
        th-class="!bg-gray !text-gray-100 last:!text-right"
        @itemsPerPage="onChangeLimit"
        @pageChange="onPageChange"
        @search="onSearch"
      >
        <template #id="{ row }">
          <span class="text-dark text-xs font-medium">{{ row?._index }}.</span>
        </template>
        <template #title="{ row }">
          <RouterLink
            :to="`/albums/${row?.id}`"
            class="duration-200 hover:text-blue-600"
            >{{ row?.title }}</RouterLink
          >
        </template>

        <template #user="{ row }">
          <p>{{ getUser(+row?.userId) }}</p>
        </template>

        <template #actions="{ row: data }">
          <CActionsDropdown :list="exchangeActions" :selected-item="data" />
        </template>
      </CTableWrapper>
    </main>
  </div>
</template>

<style scoped></style>
