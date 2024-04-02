import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { App } from "vue";
import VueAxios from "vue-axios";

import router from "@/router";

class ApiService {
  public static vueInstance: App;

  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_BASE_URL;
    this.handleResponseError(ApiService.vueInstance.axios);
  }

  public static handleResponseError(axios: AxiosInstance) {
    let originalRequest: AxiosRequestConfig | null = null;

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const errorResponse = error?.response;
        originalRequest = error?.config;

        if (errorResponse?.status === 404) {
          await router.replace({ name: "404" });
        }

        return Promise.reject(error);
      }
    );
  }

  public static query<T>(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  public static get<R = any>(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  public static post<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.post(`${resource}`, data, params);
  }

  public static update<T = any, R = any>(
    resource: string,
    slug: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.put(
      `${resource}/${slug}`,
      data,
      params
    );
  }

  public static put<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.put(`${resource}`, data, params);
  }

  public static patch<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.patch(`${resource}`, data, params);
  }

  public static delete<T = any>(
    resource: string,
    params?: T
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(`${resource}`, { params });
  }
}

export default ApiService;
