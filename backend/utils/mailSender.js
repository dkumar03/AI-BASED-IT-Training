console.log("MAIL_HOST:", process.env.MAIL_HOST);
console.log("MAIL_USER:", process.env.MAIL_USER);

const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,  // smtp.gmail.com
            port: 465,
            secure: true,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
        });
          

        const info = await transporter.sendMail({
            from: 'AI Based IT Training System || by Devanshu Kumar',
            to: email,
            subject: title,
            html: body
        });

        // console.log('Info of sent mail - ', info);
        return info;
    }
    catch (error) {
        console.error('Error while sending mail (mailSender) - ', email, error);
        throw error; // rethrow so caller knows it failed
    }
}

module.exports = mailSender;