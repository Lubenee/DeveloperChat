export type userId = string;
export type postId = string;
export type city = { label: string; value: string; available: number };
export type avatar = string | null;

export enum userType {
  Developer = 0,
  Company,
  Admin,
  Undefined,
}

export interface Identifiable<V> {
  id: V;
}

export interface DecodedToken {
  id: string;
  email: string;
  name: string;
}

export const jwtToken = "jwtToken";

export type Optional<V> = V | undefined;
