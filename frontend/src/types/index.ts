export type Company = {
  _id?: string;
  name: string;
  legalNumber: string;
  incorporationCountry: string;
  website: string;
};

export type DashboardData = {
  total: number;
  latest: { name: string; website: string }[];
  byCountry: Record<string, number>;
};

export type Product = {
  _id?: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  companyId?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = {
  accessToken: string;
};
export type RegisterData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};
