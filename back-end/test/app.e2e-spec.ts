import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

// back-end/test/app.e2e-spec.ts
describe('Users E2E', () => {
  let app: INestApplication<App>;
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create, read, update and delete a user', async () => {
    // POST /users
    const created = await request(app.getHttpServer())
      .post('/users')
      .send({ firstName: 'Test', /* ... */ })
      .expect(201);
    
    const userId = created.body.id;
    
    // GET /users/:id
    await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);
    
    // PUT /users/:id
    await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .send({ firstName: 'Updated', /* ... */ })
      .expect(200);
    
    // DELETE /users/:id
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .expect(204);
  });
});