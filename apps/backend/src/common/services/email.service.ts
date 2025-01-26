import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendMail(options: Mail.Options): Promise<void> {
        try {
            await this.transporter.sendMail(options);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

export default EmailService;
