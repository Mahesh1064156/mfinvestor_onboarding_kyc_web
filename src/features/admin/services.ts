import { axios_apibase_url } from "@/services/api";

export const getAuditLogs = async () => {
  const res = await axios_apibase_url.get("/admin");
  return res.data;
};
