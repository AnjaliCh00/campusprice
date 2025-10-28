import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "campusprice-super-secret-key-2025"
);

export interface JwtPayload {
  userId: number;
  email: string;
  name: string;
}

export async function createToken(user: { id: number; email: string; name: string }): Promise<string> {
  return await new SignJWT({ userId: user.id, email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}
