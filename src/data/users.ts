import { env } from '../config/env';

export interface Credentials {
  username: string;
  password: string;
}

/** The seeded admin account on the OrangeHRM demo instance. */
export const adminUser: Credentials = {
  username: env.admin.username,
  password: env.admin.password,
};

/** Negative-path login data, kept here so specs stay declarative. */
export const invalidLogins: Array<{ name: string } & Credentials> = [
  { name: 'wrong password', username: 'Admin', password: 'wrong-pass' },
  { name: 'unknown user', username: 'NoSuchUser', password: 'admin123' },
  { name: 'both wrong', username: 'ghost', password: 'nope' },
];
