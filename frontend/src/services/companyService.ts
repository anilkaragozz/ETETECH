import axiosClient from "@/libs/axios";
import type { Company } from "@/types";

export const getCompanies = async (): Promise<Company[]> => {
  const res = await axiosClient.get("/companies");
  return res.data;
};

export const createCompany = async (company: Company) => {
  const res = await axiosClient.post("/companies", company);
  return res.data;
};

export const updateCompany = async (company: Company) => {
  const res = await axiosClient.put(`/companies/${company._id}`, company);
  return res.data;
};

export const deleteCompany = async (id: string) => {
  const res = await axiosClient.delete(`/companies/${id}`);
  return res.data;
};
