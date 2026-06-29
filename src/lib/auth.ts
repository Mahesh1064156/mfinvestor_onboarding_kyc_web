export type Role = "admin" | "verifier"

export function getUserRole(): Role {
  const token=localStorage.getItem("token")
  if(!token) return "verifier"
  const payload=JSON.parse(atob(token.split(".")[1]))
  return payload.role as Role;
}

export function hasAccess(role: Role, path: string): boolean {
  const accessMap: Record<Role, string[]> = {
    admin: [
      "/dashboard",
      "/applications",
      "/verification",
      "/audit",
    ],
    verifier: [
      "/dashboard",
      "/applications",
      "/verification",
    ],
  }

  return accessMap[role].includes(path)
}