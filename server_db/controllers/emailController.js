import dotenv from 'dotenv';
import emailer from '@sendgrid/mail';

dotenv.config();

/**
 * @description Defines the actions for email sender
 * @class TransactionEmail
 */
class TransactionEmail {
  /**
   * @description sends email to the user which his details are contained in the parameter
   * @static
   * @param {object} req - request
   * @param {boolean} res - response
   * @method sendEmail
   */
  static async sendEmail(userInfo) {
    const {
      createdon,
      accountnumber,
      firstname,
      amount,
      balance,
      type,
      email,
    } = userInfo;

    emailer.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: 'techranchsolutions@gmail.com',
      subject: 'Transaction Alert',
      templateId: 'd-2e7e1378de4b48548880f9e177ab6c96',
      dynamic_template_data: {
        subject: `Banka ${type} Alert`,
        firstname,
        amount,
        balance,
        accountnumber,
        date: createdon,
        type,
      },
    };

    const deliveredEmail = await emailer.send(msg);
    if (deliveredEmail) {
      return true;
    }
    return false;
  }
}

export default TransactionEmail;
