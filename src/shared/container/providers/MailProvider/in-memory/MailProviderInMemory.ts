import { IMailProvider } from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private messsage: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.messsage.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };
