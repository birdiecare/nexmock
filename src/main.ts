import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as hbs from "express-handlebars";
import { AppModule } from "./app.module";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.engine(
    "hbs",
    hbs({
      extname: "hbs",
      defaultLayout: "main",
      layoutsDir: join(__dirname, "..", "views/layouts"),
    })
  );
  app.setViewEngine("hbs");
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
