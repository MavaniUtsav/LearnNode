const nodemailer = require('nodemailer')
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const fs = require('fs');
const { getOrders } = require('../services/order.service');
const { log } = require('console');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

const pdfDefinition = {
    pageSize: 'A4',
    content: [
        { text: 'Invoice', fontSize: 25, bold: true, alignment: 'center' },
        {
            table: {
                headers: ['Name', 'Age', 'City'],
                body: [
                    ['John Doe', 30, 'New York'],
                    ['Jane Doe', 25, 'San Francisco'],
                    ['Bob Smith', 35, 'Los Angeles']
                ]
            }
        },
        {
            image: 'data:image/jpg;base64,' + image,
            width: 200,
        }
    ]
};
const sendMail = async (req, res) => {
    const orderData = await getOrders()
    console.log(orderData);

    const base64 = pdfMake.createPdf(pdfDefinition);
    base64.getBase64((encoded) => {
        const mailOptions = {
            from: 'utsavmavani01@gmail.com', // sender address
            to: 'affiliat.utsav2022@gmail.com', // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world? Keval tare thay gyu??", // plain text body
            html: "<b>Hello world?</b>", // html body
            attachments: [
                {
                    filename: 'Test_pdf.pdf',
                    content: encoded,
                    encoding: 'base64'
                }
            ]
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.status(200).json({ message: `Email has been sent!` })
        })
    })
}

module.exports = sendMail