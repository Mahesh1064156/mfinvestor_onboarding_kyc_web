import { api } from "@/services/api";

export const getAuditLogs = async () => {
  const res = await api.get("/admin");
  return res.data;
};
