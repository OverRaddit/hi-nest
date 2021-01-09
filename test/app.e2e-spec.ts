import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스트환경에서도 파이프를 똑같이 설치해줘야함. 중요
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      //whitelist에 없는 키 값들을 차단한다.
      forbidNonWhitelisted: true,
      // 유저가 보낸 값을 실제 데이터 값으로 보내준다.
      transform: true,
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies",()=>{
    it('GET', ()=>{
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    })

    it("POST 201", ()=>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test",
        year:2000,
        genres:['test'],
      })
      .expect(201);
    });
    it("POST 400", ()=>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test",
        year:2000,
        genres:['test'],
        other: "thing"
      })
      .expect(400);
    })

    it("DELETE", ()=>{
      return request(app.getHttpServer())
      .delete("/movies")
      .expect(404);
    })
  });

  describe('/movies/:id', () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    });

    it("GET 404", () => {
      return request(app.getHttpServer())
      .get("/movies/999")
      .expect(404);
    });

    it("PATCH 200", ()=>{
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: "Updated Test"})
        .expect(200);
    })
    
    it("DELETE 200", ()=>{
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    })
  }) 

  


});
