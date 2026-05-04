import type { ToastMessageOptions } from 'primevue/toast';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface DetailedPost extends Post {
  user: User;
}

export interface PaginatedPosts {
  data: DetailedPost[];
  total: number;
}

export interface ToastPayload {
  success: boolean;
  postId: number;
  message: ToastMessageOptions;
}
