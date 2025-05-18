// src/services/mutations/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/libs/axios";
import type { RegisterData } from "@/types";

export const useRegister = () =>
  useMutation({
    mutationFn: (data: RegisterData) =>
      axiosClient.post("/auth/register", data).then((res) => res.data),
  });
