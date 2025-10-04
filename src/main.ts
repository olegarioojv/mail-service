import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672"],
    queue: "mail_queue",
    queueOptions: { durable: true },
  },
});


  await app.listen();
  console.log("Mail Service conectado ao RabbitMQ e ouvindo fila mail_queue");
}

bootstrap();
