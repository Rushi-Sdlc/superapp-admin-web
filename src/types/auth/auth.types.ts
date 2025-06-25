export interface AdminLoginRequest {
  email: string;
  passcode: string;
}

export interface AdminLoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      email: string;
      role: string;
    };
  };
  message: string;
}
