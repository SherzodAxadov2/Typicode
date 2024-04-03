<script setup lang="ts">
import CBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { useMounted } from "@/composables/useMounted";
import { required } from "@vuelidate/validators";

import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import CTableWrapper from "@/components/Common/Table/CTableWrapper.vue";
import { exchangeActions, modelHead } from "@/modules/Albums/data";
import { useAlbumsStore } from "@/modules/Albums/store";
import { IAlbum, IUser } from "@/modules/Albums/types";
import CActionsDropdown from "@/components/Common/Dropdown/CActionsDropdown.vue";
import CCard from "@/components/Card/CCard.vue";
import { debounce } from "@/utils";
import FGroup from "@/components/Form/FGroup.vue";
import FInput from "@/components/Form/Input/FInput.vue";
import CButton from "@/components/Common/CButton.vue";
import { useForm } from "@/composables/useForm";
import FSelect from "@/components/Form/Select/FSelect.vue";
import CDialog from "@/components/Common/Dialog/CDialog.vue";
import CDeleteDialog from "@/components/Common/Dialog/CDeleteDialog.vue";
import { useHandleError } from "@/composables/useHandleError";
import { useCustomToast } from "@/composables/useCustomToast";

const store = useAlbumsStore();
const { mounted } = useMounted();
const { handleError } = useHandleError();
const { showToast } = useCustomToast();
const { t } = useI18n();
const loading = ref(true);
const allAlbums = ref<IAlbum[]>([]);
const selectedData = ref<IAlbum>();
const buttonLoading = ref(false);
const show = ref(false);
const deleteModal = ref(false);
const isEdit = ref(false);
const routes = computed(() => [
  {
    name: t("albums"),
    route: "/albums",
  },
]);
const albums = computed(() => store.albums as IAlbum[]);
const users = computed(() => store.users as IUser[]);

const form = useForm(
  {
    title: "",
    user: "",
  },
  {
    title: { required },
    user: { required },
  }
);

onMounted(() => {
  store.fetchAlbums().finally(() => (loading.value = false));
  store.fetchUsers();
});

watch(
  albums,
  (newVal) => {
    allAlbums.value = newVal;
  },
  { deep: true }
);

function getUser(id: number) {
  let user = users.value?.find((el) => el?.id === id);
  if (user) {
    return user?.name;
  }
  return;
}

function searchAlbums(search: string) {
  debounce(
    "searchAlbums",
    () => {
      allAlbums.value = albums.value.filter((album) =>
        album.title.toLowerCase().includes(search.toLowerCase())
      );
    },
    200
  );
}

function openEditModal(data: IAlbum) {
  selectedData.value = data;
  isEdit.value = true;
  show.value = true;
  form.values.title = data?.title;
  form.values.user = data?.userId;
}

function openAddModal() {
  form.values.title = "";
  form.values.user = "";
  show.value = true;
  isEdit.value = false;
}

function openDeleteModal(data: IAlbum) {
  selectedData.value = data;
  deleteModal.value = true;
}

function submit() {
  isEdit.value ? editAlbum() : addAlbum();
}

function addAlbum() {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    buttonLoading.value = true;
    let data = {
      title: form.values.title,
      userId: form.values.user,
    };
    store
      .addAlbum(data)
      .then(() => {
        form.$v.value.$reset();
        show.value = false;
        showToast(t("added_successfully"), "success");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        buttonLoading.value = false;
      });
  }
}

function editAlbum() {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    buttonLoading.value = true;
    store
      .editAlbum({
        id: Number(selectedData.value?.id),
        title: form.values.title,
        userId: +form.values.user,
      })
      .then(() => {
        form.$v.value.$reset();
        show.value = false;
        showToast(t("edited_successfully"), "success");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        buttonLoading.value = false;
      });
  }
}

function deleteAlbum() {
  store
    .deleteAlbum(Number(selectedData.value?.id))
    .then(() => {
      deleteModal.value = false;
      showToast(t("deleted_successfully"), "success");
    })
    .catch((error) => {
      handleError(error);
    });
}
</script>

<template>
  <div>
    <Teleport v-if="mounted" to="#header-breadcrumbs">
      <CBreadcrumb v-bind="{ routes }" />
    </Teleport>

    <main>
      <CCard class="p-6">
        <CTableWrapper
          :data="allAlbums"
          :head="modelHead"
          :loading="loading"
          @search="searchAlbums"
          :subtitle="t('albums_number', { count: albums?.length ?? 0 })"
          :title="$t('albums')"
          th-class="!bg-gray !text-gray-100 last:!text-right"
        >
          <template #afterSearch>
            <CButton
              :text="$t('add')"
              icon="icon-plus"
              class="flex items-center py-2 px-4 gap-2"
              size="md"
              @click="openAddModal"
              v-bind="{ loading, disabled: loading }"
            />
          </template>

          <template #id="{ row }">
            <span class="text-dark text-xs font-medium"
              >{{ row?._index }}.</span
            >
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
            <CActionsDropdown
              :list="exchangeActions"
              :selected-item="data"
              @edit="openEditModal(data)"
              @delete="openDeleteModal(data)"
            />
          </template>
        </CTableWrapper>
      </CCard>
    </main>

    <CDialog
      v-bind="{ show }"
      :title="$t(isEdit ? 'edit_album' : 'add_album')"
      @close="show = false"
      body-class="!max-w-[421px] !overflow-y-visible"
    >
      <div class="p-5 pt-4">
        <FGroup class="mt-5" :label="$t('title')">
          <FInput
            :placeholder="$t('title')"
            v-model="form.values.title"
            :error="form.$v.value.title?.$error"
          />
        </FGroup>

        <FGroup class="mt-5" :label="$t('user')">
          <FSelect
            v-model="form.values.user"
            :error="form.$v.value.user?.$error"
            :options="users"
            label-key="name"
            value-key="id"
            :placeholder="$t('select_user')"
            is-checked
          />
        </FGroup>
      </div>
      <template #footer>
        <div class="p-5 pt-0 flex items-center justify-end">
          <div class="flex items-center gap-4">
            <CButton
              variant="info"
              :text="$t('cancel')"
              type="button"
              @click="show = false"
            />
            <CButton
              variant="primary"
              :disabled="form.$v.value.$invalid"
              :loading="buttonLoading"
              :text="$t(isEdit ? 'save' : 'add')"
              @click="submit"
            />
          </div>
        </div>
      </template>
    </CDialog>
    <CDeleteDialog
      :subtitle="$t('delete_album')"
      :title="selectedData?.title"
      :show="deleteModal"
      @close="deleteModal = false"
      @submit="deleteAlbum"
    />
  </div>
</template>

<style scoped></style>
