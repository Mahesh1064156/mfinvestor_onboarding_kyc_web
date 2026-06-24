import { api } from "@/services/api";

export const getApplications = async () => {
  const res = await api.get("/applications");
  return res.data;
};