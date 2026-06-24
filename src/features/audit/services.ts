import { api } from "@/services/api";

export const getAuditLogs = async () => {
  const res = await api.get("/audit");
  return res.data;
};
