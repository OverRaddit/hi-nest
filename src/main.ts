import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    //whitelist에 없는 키 값들을 차단한다.
    forbidNonWhitelisted: true,
    // 유저가 보낸 값을 실제 데이터 값으로 보내준다.
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
