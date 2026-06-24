export interface Application {
  id: string;
  name: string;
  pan: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  createdAt: string;
}
