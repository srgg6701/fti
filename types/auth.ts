export interface User {
  id: number;
  email: string;
  username: string;
  default_language_id: number;
  start_page: string;
  is_ban: boolean;
  tour_step: number;
}

export default interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}
