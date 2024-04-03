export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IActionType {
  label: string;
  value: string;
  icon: string;
  class?: string;
  iconClass?: string;
}

export interface IAlbumSingle {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
