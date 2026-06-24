import { api } from "@/services/api";

export const updateVerification = (id: string, status: string) =>
  api.post(`/verify/${id}`, { status });