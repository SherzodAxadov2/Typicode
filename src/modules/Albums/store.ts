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

  function addAlbum(album: { title: string; userId: string }) {
    return new Promise<IAlbum>((resolve, reject) => {
      axios
        .post<IAlbum>("/albums", album)
        .then(({ data }) => {
          console.log(data);
          albums.value.unshift(data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function editAlbum(album: IAlbum) {
    return new Promise<IAlbum>((resolve, reject) => {
      axios
        .put<IAlbum>(`/albums/${album.id}`, album)
        .then(({ data }) => {
          const index = albums.value.findIndex((a) => a.id === album.id);
          albums.value[index] = data;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function deleteAlbum(id: number) {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`/albums/${id}`)
        .then(() => {
          albums.value = albums.value.filter((album) => album.id !== id);
          resolve();
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
    addAlbum,
    editAlbum,
    deleteAlbum,
  };
});
