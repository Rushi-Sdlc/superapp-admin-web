export interface UserKYC {
  verification_method: string;
  is_active: boolean;
}

export interface Wallet {
  wallet_id: string;
  qr_code: string;
  wallet_mobile_number: number;
}

export interface Customer {
  _id: string;
  first_name: string;
  last_name: string;
  individual_id: string;
  phone_verified: boolean;
  email_verified: boolean;
  createdAt: string;
  kyc: UserKYC[];
  wallet: Wallet;
}
