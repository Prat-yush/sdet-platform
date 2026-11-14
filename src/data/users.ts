/**
 * Seeded Toolshop accounts. These are public demo credentials published by the SUT itself,
 * so they are safe to commit. Real secrets would come from .env / CI secrets instead.
 */
export interface UserCredentials {
  email: string;
  password: string;
}

const SEEDED_PASSWORD = 'welcome01';

export const users = {
  admin: { email: 'admin@practicesoftwaretesting.com', password: SEEDED_PASSWORD },
  customer: { email: 'customer@practicesoftwaretesting.com', password: SEEDED_PASSWORD },
  customer2: { email: 'customer2@practicesoftwaretesting.com', password: SEEDED_PASSWORD },
} as const satisfies Record<string, UserCredentials>;
