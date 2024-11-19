// // import PDFDocument from 'pdfkit';
// // import fs from 'fs';

// // function OrderReport(orders) {
// //     // Create a new PDF document
// //     const doc = new PDFDocument();
    
// //     // Pipe the PDF document to a writable stream
// //     const writeStream = fs.createWriteStream('orders_report.pdf');
// //     doc.pipe(writeStream);
    
// //     // Add content to the PDF document
// //     doc.fontSize(18).text('Orders Report', { align: 'center' }).moveDown(0.5);

// //     doc.fontSize(14).text('Orders:', { underline: true }).moveDown(0.5);

// //     orders.forEach((order, index) => {
// //         doc.text(`Order ID: ${order.oid}`);
// //         doc.text(`Supplier: ${order.supplier}`);
// //         doc.text(`Date: ${order.date}`);
// //         doc.text(`Brand Name: ${order.bname}`);
// //         doc.text(`Quantity: ${order.quantity}`);
// //         if (index !== orders.length - 1) {
// //             doc.moveDown(0.5);
// //         }
// //     });

//     // Finalize the PDF document
//     doc.end();

//     console.log('Report generated successfully.');
// }

// export default OrderReport;
