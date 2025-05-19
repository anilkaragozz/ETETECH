import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/libs/axios";
import type { LoginRequest, LoginResponse } from "@/types";

export const useLogin = () =>
  useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: (req: LoginRequest) =>
      axiosClient.post("/auth/login", req).then((res) => res.data),
  });
