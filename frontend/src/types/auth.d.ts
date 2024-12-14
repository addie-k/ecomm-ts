export interface SignupRequest {
    email: string;
    name: string;
    password: string;
  }
  
  export interface SignupResponse {
    id: string;
    email: string;
    name: string;
  }

export interface ApiError {
    response?: {
      data?: {
        error?: string;
      };
      status?: number;
      statusText?: string;
    };
    message: string;
  }

export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    id: string;
    email: string;
    name: string;
  }
  