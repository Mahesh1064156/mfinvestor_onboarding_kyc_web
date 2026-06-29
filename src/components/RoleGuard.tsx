import { getUserRole } from "@/lib/auth"

export default function RoleGuard({
  allowed,
  children,
}: {
  allowed: string[]
  children: React.ReactNode
}) {
  const role = getUserRole()

  if (!allowed.includes(role)) {
    return <p className="text-red-500">Access Denied</p>
  }

  return <>{children}</>
}