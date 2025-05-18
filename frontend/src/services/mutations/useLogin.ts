import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/libs/axios";
import type { LoginRequest, LoginResponse } from "@/types";

export const useLogin = () =>
  useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: (data: LoginRequest) =>
      axiosClient.post("/auth/login", data).then((res) => res.data),
  });
