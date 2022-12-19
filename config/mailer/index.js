const nodeMailer = require('nodemailer');

const sendMail = (to, subject, htmlContent) => {
    const tranport = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const option = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent
    }

    return tranport.sendMail(option);
}

module.exports = {
    sendMail
}