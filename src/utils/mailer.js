const nodemailer = require('nodemailer')
const fs = require('fs')

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "utsavmavani01@gmail.com",
        pass: "eaxm pbbr ovmy bxsg",
    },
    tls: {
        rejectUnauthorized: false, // Add this line to avoid certificate validation issues
    },
});

const image = fs.readFileSync('./src/temp/2b34181f-bc15-42d8-98cb-4d26099afbdb1705304702492HMBoysLong-SleevedCottonShirts1.jpg', 'base64')
const image2 = fs.readFileSync('./src/temp/8f2b9366-c962-4d34-9475-8d5f71209cff1689420546451KALINIBlackEmbellishedSequinnedPureGeorgetteSaree6.jpg', 'base64')

const recipients = ['affiliat.utsav2022@gmail.com', 'yashbhalani007@gmail.com'];
const sendMail = async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: 'utsavmavani01@gmail.com', // sender address
            to: recipients.join(', '), // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world? Keval tare thay gyu??", // plain text body
            html: "<b>Hello world?</b>", // html body
            attachments: [
                {
                    filename: 'test.txt',
                    content: 'Hello this is test attachment file'
                },
                {
                    filename: 'Test_pdf.pdf',
                    content: image,
                }
            ]
        });

        if (!info) {
            return res.status(500).send('Error sending email')
        }
        console.log("Message sent: %s", info.messageId);
        res.json({
            message: 'Email sent' + info.messageId,
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: 'Error sending email: ' + error.message,
        });
    }

}

module.exports = sendMail
