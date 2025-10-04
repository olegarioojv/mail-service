import { Injectable } from "@nestjs/common";
import { NodemailerService } from "../../domain/services/nodemail.service";

@Injectable()
export class SendWelcomeEmailUseCase {
  constructor(private readonly mailer: NodemailerService) {}

  async execute(email: string, name: string) {
    const html = `<h1>Bem-vindo, ${name}!</h1><p>Obrigado por se cadastrar em nossa biblioteca!! </p>`;
    await this.mailer.sendTemplate(
        email,
    "Bem-vindo à Biblioteca-Service",
    "welcome",
    { name }
);

  }
}
