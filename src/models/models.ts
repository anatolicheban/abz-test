export interface Links {
  next_url: string;
  prev_url?: any;
}

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
  total_pages: number;
  total_users: number;
  count: number;
  page: number;
  links: Links;
  users: User[];
}

export interface Position {
  id: number;
  name: string;
}

export interface getPositionsResponse {
  success: boolean;
  positions: Position[];
}
