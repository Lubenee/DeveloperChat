export type userId = string;
export type postId = string;
export type city = { label: string; value: string; available: number };

export enum userType {
  Developer = 0,
  Company,
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
