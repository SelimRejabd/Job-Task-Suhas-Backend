export interface IInvite {
  email: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
  token: string;
  expiresAt: Date;
  acceptedAt: Date;
}
