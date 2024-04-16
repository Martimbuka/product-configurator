const nodemailer = require('nodemailer');

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

// send mail from testing accout
const sendEmail = async (req, res) => {
    
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    let mailOptions = {
        from: '"Martin Jivkov" <foo@example.com>',
        to: "martin.jivkov5@gmail.com",
        subject: "Бланка за тапетни врати",
        text: "Бланка за тапетни врати",
        html: `<h1>Име: ${req.body.name}</h1>`
    };

    transporter.sendMail(mailOptions)
    .then((info) => {
        return res.status(201).json({
            message: 'Email sent',
            info: nodemailer.getTestMessageUrl(info)
        });
    })
    .catch((err) => {
        console.error(err);
    });
}

module.exports = {
    sendEmail
}