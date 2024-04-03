import { defineStore } from "pinia";
import { ref } from "vue";
import { IAlbum, IAlbumSingle, IUser } from "@/modules/Albums/types";
import ApiService from "@/services/ApiService";
import axios from "axios";

export const useAlbumsStore = defineStore("albomStore", () => {
  const albums = ref<IAlbum[]>([]);
  const users = ref<IUser[]>([]);
  const singleAlbums = ref<IAlbumSingle[]>();

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

  function fetchAlbumSingle(id: number) {
    return new Promise<IAlbumSingle[]>((resolve, reject) => {
      axios
        .get<IAlbumSingle[]>(`photos`, {
          params: {
            albumId: id,
          },
        })
        .then(({ data }) => {
          singleAlbums.value = data;
          resolve(singleAlbums.value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return {
    albums,
    users,
    singleAlbums,
    fetchUsers,
    fetchAlbums,
    fetchAlbumSingle,
  };
});
