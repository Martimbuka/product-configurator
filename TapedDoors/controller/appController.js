const nodemailer = require('nodemailer');

// send mail from testing accout
const personData = (req, res) => {
    
    let testAccount = nodemailer.createTestAccount();

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
        from: '"Martin Jivkov" <martin.jivkov5@gmail.com>',
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
    personData
}