import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/libs/axios";
import type { DashboardData } from "@/types";

export const useDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await axiosClient.get("/dashboard");
      return res.data;
    },
  });
};
