export type userId = string;

export enum userType {
  Undefined,
  Developer,
  Company,
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
