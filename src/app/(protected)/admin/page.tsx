import AuditFeature from "@/features/admin";
import { getUserRole } from "@/lib/auth";
import RoleGuard from "@/components/RoleGuard";
export default function Page() {
  const role = getUserRole();
  if (role !== "admin") {
    return <p className="text-red-500">Access Denied</p>;
  }
  return 
  <RoleGuard allowed={["audit"]}>
  <AuditFeature />;
  </RoleGuard>
}
