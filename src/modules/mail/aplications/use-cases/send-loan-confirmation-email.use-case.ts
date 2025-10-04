import { Injectable } from "@nestjs/common";
import { NodemailerService } from "../../domain/services/nodemail.service";

@Injectable()
export class SendLoanConfirmationEmailUseCase {
  constructor(private readonly mailer: NodemailerService) {}

  async execute(email: string, bookTitle: string) {
    return this.mailer.sendTemplate(
      email,
      "Confirmação de Empréstimo",
      "loan-confirmation",
      { bookTitle }
    );
  }
}
