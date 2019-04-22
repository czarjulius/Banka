import dotenv from 'dotenv';
import emailer from '@sendgrid/mail';

dotenv.config();

class TransactionEmail {
  static async sendEmail(email) {
    console.log(email);

    emailer.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('env', process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: 'techranchsolutions@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      // templateId: 'd-2e7e1378de4b48548880f9e177ab6c96',
      // dynamic_template_data: {
      //   subject: 'Testing Templates',
      //   name: 'Julius',
      //   amount: '1200',
      // },
    };
    console.log('msg', msg);

    const deliveredEmail = await emailer.send(msg);
    console.log('deliveredEmail', deliveredEmail);

    if (deliveredEmail) {
      return true;
    }
    return false;
  }
}

export default TransactionEmail;
