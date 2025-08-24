import { fetchData } from ".";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
}

export interface UsersResponse {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  users: User[];
}

export const fetchUsersFirstPage = (page = 1, count = 6) =>
  fetchData<UsersResponse>(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`
  );
