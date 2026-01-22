import { config } from "../../config";

const allowedSameSite = ["lax", "strict", "none"] as const;
type SameSiteType = (typeof allowedSameSite)[number];

function getSameSite(): SameSiteType | undefined {
  const envValue = process.env.COOKIE_SAMESITE?.toLowerCase();
  if (allowedSameSite.includes(envValue as SameSiteType)) {
    return envValue as SameSiteType;
  }
  return undefined;
}

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: getSameSite(),
  domain: config.cookie_domain,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
