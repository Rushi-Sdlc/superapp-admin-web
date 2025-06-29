// types/merchant.types.ts

export interface Wallet {
  _id: string;
  user_id: string;
  individual_id: string;
  wallet_id: string;
  qr_code: string;
  wallet_mobile_number: number;
  currency: string;
  balance: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface KycDocument {
  _id: string;
  user_id: string;
  verification_method: 'national_id' | 'driving_license' | string;
  national_id_document: string[];
  driving_license_document: string[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  biometric_image: string;
}

export interface customer {
  _id: string;
  email: string;
  role: string;
  country: string;
  isGuinea: boolean;
  phone_verified: boolean;
  email_verified: boolean;
  individual_id: string;
  is_passcode_set_by_dist_or_sub_dist: boolean;
  identity_verification_status: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
  kyc: KycDocument[]; // Can be improved later
  wallet?: Wallet;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

export interface CustomerApiResponse {
  success: boolean;
  message: string;
  data: customer[];
  pagination: PaginationMeta;
  totalCustomers: number;
  totalNewCustomersThisMonth: number;
  totalActiveCustomers: number;
}

// types/merchant/merchant.types.ts (add at the bottom)

export interface EkycUserDetails {
  _id: string;
  email: string;
  role: string;
  country: string;
  isGuinea: boolean;
  phone_verified: boolean;
  email_verified: boolean;
  individual_id: string;
  is_passcode_set_by_dist_or_sub_dist: boolean;
  identity_verification_status: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  date_of_birth?: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
}

export interface EkycRecord {
  _id: string;
  user_id: string;
  verification_method: string;
  national_id_document?: string[];
  passport_id_document?: string;
  driving_license_document?: string[];
  biometric_image: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  userDetails: EkycUserDetails;
}

export interface EkycMerchantApiResponse {
  success: boolean;
  message: string;
  data: EkycRecord[];
  newKYCs: number;
  activeMerchants: number;
  pagination: PaginationMeta;
}
