const ROLE_KEY = "rydroo_pending_auth_role";
const EMAIL_KEY = "rydroo_pending_auth_email";

export type PendingAuthRole = "user" | "driver";

export function savePendingAuthPreferences(role: PendingAuthRole, email: string) {
  sessionStorage.setItem(ROLE_KEY, role);
  sessionStorage.setItem(EMAIL_KEY, email);
}

export function getPendingAuthRole(): PendingAuthRole {
  const role = sessionStorage.getItem(ROLE_KEY);
  return role === "driver" ? "driver" : "user";
}

export function getPendingAuthEmail(): string {
  return sessionStorage.getItem(EMAIL_KEY) || "";
}

export function clearPendingAuthPreferences() {
  sessionStorage.removeItem(ROLE_KEY);
  sessionStorage.removeItem(EMAIL_KEY);
}
