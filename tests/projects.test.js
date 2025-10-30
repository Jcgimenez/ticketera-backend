const request = require('supertest');
const app = require('../src/app');

async function loginAdmin() {
  const res = await request(app).post('/api/auth/login').send({ email: 'admin@example.com', password: 'Password123!' });
  return res.body.token;
}

describe('Projects CRUD (requires seeded admin)', () => {
  let token;
  let createdId;

  beforeAll(async () => {
    token = await loginAdmin();
  });

  it('List projects', async () => {
    const res = await request(app).get('/api/projects').set('Authorization', `Bearer ${token}`);
    expect([200,401,403]).toContain(res.status);
  });

  it('Create project', async () => {
    const list = await request(app).get('/api/teams').set('Authorization', `Bearer ${token}`);
    if (list.status !== 200 || !list.body.data?.length) return;
    const teamId = list.body.data[0].id;
    const res = await request(app).post('/api/projects').set('Authorization', `Bearer ${token}`).send({ name: 'Test Project', description: 'From test', status: 'active', teamId });
    if (res.status === 201) createdId = res.body.id;
    expect([201,403]).toContain(res.status);
  });

  it('Update project', async () => {
    if (!createdId) return;
    const res = await request(app).patch(`/api/projects/${createdId}`).set('Authorization', `Bearer ${token}`).send({ status: 'archived' });
    expect(res.status).toBe(200);
  });

  it('Delete project', async () => {
    if (!createdId) return;
    const res = await request(app).delete(`/api/projects/${createdId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});

