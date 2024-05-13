import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as cors from 'cors';

const whiteListPatterns = [
  // auth
  '/auth/login',
  // user
  '/user',
  '/user/register',
  // warehouse
  '/warehouse',
  '/warehouse/createHouse',
  /\/warehouse\/\w+-\w+-\w+-\w+-\w+/,
  // housedetail
  '/housedetail/add',
  /\/housedetail\/\w+-\w+-\w+-\w+-\w+/,
  /\/housedetail\/\w+-\w+-\w+-\w+-\w+\/\w+-\w+-\w+-\w+-\w+/,
];
function middleWareAll(req, res, next) {
  const path = req.path; // 注意这里使用 req.path 而不是 req.originalUrl

  // 检查路径是否匹配白名单中的任何模式
  if (
    whiteListPatterns.some((pattern) => {
      // 如果 pattern 是字符串，则直接比较
      if (typeof pattern === 'string') {
        return path === pattern;
      }
      // 如果 pattern 是正则表达式，则测试路径是否匹配
      else if (pattern instanceof RegExp) {
        return pattern.test(path);
      }
      // 其他情况可以抛出错误或返回 false
      return false;
    })
  ) {
    next(); // 如果匹配，则继续处理请求
  } else {
    console.log(path, '你被我拦截了！');
    res.send({ code: 200 }); // 如果不匹配，则发送响应并结束请求
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
