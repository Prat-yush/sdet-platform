import { test, expect } from '@playwright/test';
import { users } from '@data/users';
import { API_URL } from '../../playwright.config';

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

test('customer login returns 200 and an access token', { tag: '@smoke' }, async ({ request }) => {
  const response = await request.post(`${API_URL}/users/login`, { data: users.customer });

  expect(response.status()).toBe(200);
  const body = (await response.json()) as LoginResponse;
  expect(body.access_token).toEqual(expect.any(String));
  expect(body.access_token.length).toBeGreaterThan(0);
  expect(body.token_type).toBe('bearer');
});
