import { axios_apibase_url } from "@/services/api";

export const getApplications = async () => {
  const res = await axios_apibase_url.get("/applications");
  return res.data;
};