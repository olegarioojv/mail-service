import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { SendLoanConfirmationEmailUseCase } from "src/modules/mail/aplications/use-cases/send-loan-confirmation-email.use-case";
import { SendWelcomeEmailUseCase } from "src/modules/mail/aplications/use-cases/send-welcome-email.use-case";

@Controller()
export class MailEventsController {
  constructor(
    private readonly sendWelcomeEmail: SendWelcomeEmailUseCase,
    private readonly sendLoanConfirmationEmail: SendLoanConfirmationEmailUseCase,
  ) {}

  @EventPattern("user.created")
  async handleUserCreated(@Payload() data: any) {
    console.log("📩 Evento user.created recebido:", data);
    await this.sendWelcomeEmail.execute(data.email, data.name);
  }

  @EventPattern("loan.created")
  async handleLoanCreated(@Payload() data: any) {
    console.log("📩 Evento loan.created recebido:", data);
    await this.sendLoanConfirmationEmail.execute(data.email, data.bookTitle);
  }
}
