<template>
  <div>
    <CTableHeader
      v-if="!noHeader"
      :head-classes="headClasses"
      :no-search="noSearch"
      :is-search="data?.length || filter.search"
      :search="filter.search"
      :subtitle="subtitle"
      :title="title"
      :title-class="titleClass"
      input-classes="w-full max-w-[250px]"
      search-placeholder="search"
      @search="handleTableSearch"
    >
      <template #header_title>
        <slot name="header_title"></slot>
      </template>
      <template #afterSearch>
        <slot name="afterSearch"></slot>
      </template>
      <template #beforeSearch>
        <slot name="beforeSearch"></slot>
      </template>
    </CTableHeader>
    <slot name="filter" />
    <slot name="main">
      <Transition mode="out-in" name="fade">
        <CTable
          :key="loading"
          :body-tr-class="trClass"
          :current-page="pagination.currentPage"
          :item-per-page="pagination.itemsPerPage"
          :data="
            data.slice(
              (pagination.currentPage - 1) * pagination.itemsPerPage,
              pagination.currentPage * pagination.itemsPerPage
            )
          "
          :head="data?.length ? head : []"
          :loading="loading"
          :td-class="tdClass"
          :th-class="['bg-gray-800', thClass]"
          :total="data?.length"
          :type="type"
        >
          <template
            v-for="(row, j) in head"
            :key="j"
            v-slot:[row?.key]="{ data }"
          >
            <slot v-if="row?.key" :name="`${row?.key}`" :row="data" />
          </template>
          <template #no-data>
            <slot name="no-data" />
          </template>
        </CTable>
      </Transition>
    </slot>
    <slot v-if="data?.length > 10 || noFooter" name="footer">
      <Transition mode="out-in" name="dropdown">
        <CTableFooter
          v-if="!loading"
          :key="loading"
          :total="data?.length"
          :limit="pagination.itemsPerPage"
          :items-per-page="pagination.itemsPerPage"
          :current-page="pagination.currentPage"
          :no-footer="noFooter"
          @page-change="(e) => (pagination.currentPage = e)"
          @items-per-page="(e) => perPageChange(e)"
        >
          <template v-slot:beforePagination>
            <slot name="beforePagination"></slot>
          </template>
        </CTableFooter>
      </Transition>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from "vue";
import CTable from "@/components/Common/Table/CTable.vue";
import CTableHeader from "@/components/Common/Table/CTableHeader.vue";
import CTableFooter from "@/components/Common/Table/CTableFooter.vue";
import { ITableHead } from "@/types/components/table";

import { reactive } from "vue";
import { TClassName } from "@/types/common";
import { useRoute } from "vue-router";

const route = useRoute();
const pagination = reactive({
  total: 0,
  limit: 10,
  currentPage: 1,
  itemsPerPage: 10,
});
interface Props {
  title?: string;
  titleClass?: string;
  subtitle?: string;

  type?: "filled" | "transparent";

  loading?: boolean;

  head: ITableHead[];
  data: Record<string, any>[];
  thClass?: string;
  noHeader?: boolean;
  noSearch?: boolean;
  tdClass?: string;
  trClass?: string | TClassName;
  headClasses?: string;
  noFooter?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: "transparent",
});
const emit = defineEmits<{
  (e: "search", value: string): void;
  (e: "itemsPerPage", value: number): void;
  (e: "pageChange", value: number): void;
}>();

const filter = reactive({
  status: "all" as "true" | "false",
  search: route.query?.search || "",
  date: undefined as string | undefined,
  limit: 10,
  page: 1,
});

function handleTableSearch(q: string) {
  emit("search", q);
}

function perPageChange(count: number) {
  pagination.itemsPerPage = count;
  pagination.currentPage = 1;
}
</script>
