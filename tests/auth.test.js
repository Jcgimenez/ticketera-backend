const request = require('supertest');
const app = require('../src/app');

describe('Auth', () => {
  const email = `user_${Date.now()}@example.com`;
  const password = 'Password123!';

  it('POST /api/auth/register should register', async () => {
    const res = await request(app).post('/api/auth/register').send({ name: 'Test User', email, password });
    expect([200,201]).toContain(res.status);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /api/auth/login should login', async () => {
    const res = await request(app).post('/api/auth/login').send({ email, password });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /api/auth/login invalid creds', async () => {
    const res = await request(app).post('/api/auth/login').send({ email, password: 'wrong' });
    expect([400,401]).toContain(res.status);
  });
});

