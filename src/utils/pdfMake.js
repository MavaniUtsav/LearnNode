const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const path = require('path')
const fs = require('fs')

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const fontsDirectory = path.join(__dirname, 'src', 'fonts');
pdfMake.fonts = {
    Roboto: {
        normal: path.join(fontsDirectory , 'Roboto-Regular.ttf'),
        bold: path.join(fontsDirectory , 'Roboto-Medium.ttf'),
        italics: path.join(fontsDirectory , 'Roboto-Italic.ttf'),
        bolditalics: path.join(fontsDirectory , 'Roboto-MediumItalic.ttf')
    },
}
const image = fs.readFileSync('./src/temp/2b34181f-bc15-42d8-98cb-4d26099afbdb1705304702492HMBoysLong-SleevedCottonShirts1.jpg', 'base64')

const pdfDefinition = {
    pageSize: 'A4',
    content: [
        { text: 'PDF with Table Example', fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
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
            image: 'data:image/jpeg;base64,' + image,
            width: 200,
        }
    ],
    defaultStyle:   {
        font: 'Roboto'
    }
};

const makePdf = async (req, res) => {
    console.log('makePDF');
    try {
        const pdfDoc = pdfMake.createPdf(pdfDefinition).getBase64();

         // Wrap the getBase64 function in a Promise
         const base64 = await new Promise((resolve, reject) => {
            pdfDoc.getBase64((result) => {
                console.log('resolve');
                resolve(result);
            }, (error) => {
                console.log('reject');
                reject(error);
            });
        });

        // Set appropriate headers for PDF response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=example.pdf');

        // Send the base64 encoded PDF as the response
        res.send(Buffer.from(base64, 'base64'));

        res.status(200).json({
            message: "PDF generated successfully!!"
        });
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        console.error(error.stack);

        res.status(500).json({
            message: 'Internal error: ' + error.message
        });
    }

}

module.exports = makePdf