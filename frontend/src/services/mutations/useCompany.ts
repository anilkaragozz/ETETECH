import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/libs/axios";
import type { Company } from "@/types";

// 🚀 GET - Get all companies
export const useGetCompanies = () => {
  return useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axiosClient.get("/companies");
      return res.data;
    },
  });
};

// ➕ POST - Create new company
export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (company: Company) => {
      const res = await axiosClient.post("/companies", company);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

// ✏️ PUT - Update company
export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (company: Company) => {
      const res = await axiosClient.put(`/companies/${company._id}`, company);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

// ❌ DELETE - Delete company
export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosClient.delete(`/companies/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};
