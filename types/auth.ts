interface User {
  id: number;
  email: string;
  username: string;
  default_language_id: number;
  start_page: string;
  is_ban: boolean;
  tour_step: number;
}

export interface UserProfile extends Omit<User, "is_ban"> {
  white_label_id: number;
  email: string;
  account_type: string;
  signal_follower: string;
  signal_provider: string;
  affiliate: string;
  first_name: string;
  last_name: string;
  country_id: number;
  region_id: number;
  city_id: number;
  phone: string;
  address: string;
  user_image: string;
  birthday: string;
  repeat_password: string;
  is_email_verified: number;
  company_name: string;
  autoLoginHash: string;
  review_hash: string;
  zip_code: string;
  socketId: string;
  demoAccount: string;
  paymentDetails: string;
  createdBy: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  is_online: boolean;
  is_ban: number;
  balance: number;
  unsubscribe_hash: string;
  hash_id: number;
  paypal_email: string;
  skrill_email: string;
  web_money_purse: string;
  verified: number;
  last_access: string;
}

export default interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface UserAccounts {
  id: number;
  account: string | number;
  status: string;
  broker: string;
  platform: string;
  connectionState: number;
  balance: string | number;
  currency: number;
  created_at: string;
}
