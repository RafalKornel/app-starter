export type SendTextMailData = {
  recepientEmail: string;
  text: string;
  subject: string;
};

export abstract class IMailerService {
  abstract sendTextMail(data: SendTextMailData): Promise<void>;
}
