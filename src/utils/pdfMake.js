const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfDefinition = {
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
        }
    ]
};

const makePdf = async (req, res) => {
    console.log('makePDF', pdfDefinition);
    try {
        const pdfDoc = await pdfMake.createPdf(pdfDefinition)

        if (!pdfDoc) {
            return res.status(500).json({
                message: 'Internal error!!'
            })
        }

        // Set appropriate headers for PDF response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=example.pdf');

        // Pipe the PDF directly to the response stream
        pdfDoc.getStream().pipe(res);

        pdfDoc.end();  // Finalize the PDF document
        // res.status(200).json({
        //     message: "PDF generated successfully!!"
        // })
    } catch (error) {
        res.status(500).json({
            message: 'Internal error!!' + error.message
        })
    }

}

module.exports = makePdf