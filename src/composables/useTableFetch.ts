import { reactive } from "@vue/runtime-core";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { usePagination } from "@/composables/usePagination";
import { debounce, handleError } from "@/utils";
import ApiService from "@/services/ApiService";

export function useTableFetch<TD = any>(
  url: string,
  params = {},
  itself?: boolean
) {
  const loading = ref(false);
  const route = useRoute();
  const router = useRouter();
  const filter = ref({});
  const offSet = computed(
    () => (Number(route.query.page) - 1) * Number(route.query.limit)
  );

  const defaultParams = {
    page: route.query.page ? +route.query.page : 1,
    limit: route.query.limit ? +route.query.limit : 10,
    offset: isNaN(offSet.value) ? 0 : offSet.value,
    search: route.query.search,
  };

  const paginationData = reactive({
    total: 0,
    defaultLimit: defaultParams.limit,
    currentPage: defaultParams.page,
    offset: (defaultParams.page - 1) * defaultParams.limit,
  });

  const { offset, changePage } = usePagination(
    ref(paginationData.defaultLimit),
    ref(paginationData.currentPage)
  );

  const searchText = ref(route.query.search);

  const tableData = ref<TD[]>([]);
  const totals = ref({});
  const fetchTableData = () => {
    loading.value = true;

    ApiService.query(url, {
      params: {
        ...route.query,
        ...filter.value,
        search: searchText.value,
        limit: paginationData.defaultLimit,
        page: paginationData.currentPage,
        offset: paginationData.offset,
        ...params,
      },
    })
      .then((res: any) => {
        paginationData.total = res?.data?.count;
        totals.value = res?.data?.totals;
        tableData.value = itself ? res?.data : res?.data?.results;
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => (loading.value = false));
  };

  onBeforeMount(async () => {
    const currentPage = Number(route.query.page);
    if (currentPage && +currentPage !== paginationData.currentPage) {
      await onPageChange(+currentPage);
    } else {
      fetchTableData();
    }
  });

  async function onSearch(text: string) {
    offset.value = 0;
    await onPageChange(1);
    searchText.value = text;
    debounce("search-merchant-search", fetchTableData, 500);
  }

  const onPageChange = async (page: number) => {
    if (page && page !== paginationData.currentPage) {
      paginationData.currentPage = page;
      paginationData.offset = (page - 1) * paginationData.defaultLimit;
      changePage(page);
      fetchTableData();
    }
  };

  const scrollToTop = () => {
    const tableEl = document.querySelector(".i-table");
    if (tableEl) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onChangeLimit = async (newLimit: number) => {
    paginationData.defaultLimit = newLimit;
    paginationData.currentPage = 1;
    paginationData.offset = 0;
    await onSearch(String(route.query.search || ""));
    scrollToTop();
    await router.replace({ query: { limit: newLimit } });
  };

  const filterTableData = async (obj: object) => {
    filter.value = obj;
    paginationData.offset = 0;
    paginationData.currentPage = 1;
    fetchTableData();
  };

  return {
    offset,
    loading,
    tableData,
    totals,
    defaultParams,
    paginationData,
    onSearch,
    onPageChange,
    onChangeLimit,
    filterTableData,
    fetchTableData,
  };
}
