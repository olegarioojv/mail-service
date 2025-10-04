import { Module } from '@nestjs/common';
import { MailEventsController } from './controllers/dto/mail.events.controller';
import { NodemailerService } from '../domain/services/nodemail.service';
import { SendWelcomeEmailUseCase } from '../aplications/use-cases/send-welcome-email.use-case';
import { SendLoanConfirmationEmailUseCase } from '../aplications/use-cases/send-loan-confirmation-email.use-case';

@Module({
  controllers: [MailEventsController],
  providers: [
    NodemailerService,
    SendWelcomeEmailUseCase,
    SendLoanConfirmationEmailUseCase,
  ],
})
export class MailModule {}
