import { axios_apibase_url } from "@/services/api";

export const updateVerification = (id: string, status: string) =>
  axios_apibase_url.post(`/dashboard/${id}`, { status });