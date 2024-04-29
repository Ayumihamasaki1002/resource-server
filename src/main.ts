import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as cors from 'cors';

const whiteList = ['/auth/login', '/auth/register'];
function middleWareAll(req, res, next) {
  console.log(req.originalUrl, '你被我拦截了！');

  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send({ code: 200 });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger 配置
  const config = new DocumentBuilder()
    .setTitle('SummerPockets') // api文档标题
    .setDescription('SummerPockets API文档') // api文档描述
    .setVersion('1.0') // api文档版本
    .addTag('') // 标签
    .addBearerAuth() // token鉴权
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // setup第一个参数为访问路径（如：http://localhost:3000/api），一般不用api，替换成api-docs,防止跟接口冲突
  // SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('api-docs', app, document);

  // 跨域
  app.use(cors());
  app.use(middleWareAll);
  await app.listen(3000);
}
bootstrap();
