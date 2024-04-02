import { defineStore } from "pinia";
import { ref } from "vue";
import { IAlbum, IUser } from "@/modules/Albums/types";
import ApiService from "@/services/ApiService";
import axios from "axios";

export const useAlbumsStore = defineStore("albomStore", () => {
  const albums = ref<IAlbum[]>([]);
  const users = ref<IUser[]>([]);

  const fetchAlbums = async () => {
    if (albums.value.length) return;

    ApiService.get<IAlbum[]>("/albums").then((response) => {
      console.log(response);
      albums.value = response.data;
    });
  };

  function fetchUsers() {
    return new Promise<IUser[]>((resolve, reject) => {
      axios
        .get<IUser[]>(`/users`)
        .then(({ data }) => {
          users.value = data;
          resolve(users.value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return {
    albums,
    users,
    fetchUsers,
    fetchAlbums,
  };
});
