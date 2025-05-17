export type Company = {
  id: string;
  name: string;
  website: string;
  incorporationCountry: string;
  incorporationDate?: string;
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
};
