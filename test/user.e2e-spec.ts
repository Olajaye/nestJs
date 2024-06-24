import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';
import { response } from 'express';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [
      {id: 1, name: 'Gbolahan', email: 'Olajaye@gmail.com',role: 'INTERN'
      },
      { id: 2, name: 'Wassi', email: 'Wassi@gmail.com', role: 'ADMIN' },
      { id: 3, name: 'Lina', email: 'Lina@gmail.com', role: 'DOCTOR' },
      { id: 4, name: 'Kay', email: 'Kay@gmail.com', role: 'ADMIN' }
    ]
  const mockUserService = {
    
  }
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [UserService,
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', () => {
    
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect(mockUsers) 
  });


  it('/user (POST)', () => {
    const dto = { name: "Gbolahan", email: "olajaye@gmail.com", role: "ADMIN" }
    return request(app.getHttpServer())
      .post('/user')
      .send(dto)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...dto
        })
      })
  });

   it('/user (POST) ---> 400 on validation erro', () => {
    const dto = { name: 565655, email: "olajaye", role: "NOROLE" }
    return request(app.getHttpServer())
      .post('/user')
      .send(dto)
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({
        message: [
          'name must be a string',
          'email must be an email',
          'Valid role required'
        ],
      error: 'Bad Request',
      statusCode: 400
    })
  });

 
});
