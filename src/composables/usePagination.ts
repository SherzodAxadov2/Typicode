import { Ref, ref } from "vue";

export function usePagination(limit: Ref<number>, defaultPage: Ref<number>) {
  const offset = defaultPage
    ? ref((defaultPage.value - 1) * limit.value)
    : ref(0);
  const currentPage = defaultPage ?? ref(1);

  const changePage = (page: number) => {
    currentPage.value = page;
    offset.value = (page - 1) * limit.value;
  };

  return {
    limit,
    offset,
    currentPage,
    changePage,
  };
}
