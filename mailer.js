var nodemailer = require('nodemailer');
const excel = require('excel4node');
require('dotenv').config()

mailer = (list) => {

  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet('Μηδενικά TOP προϊόντα')
  let style = workbook.createStyle({
    font: {
      color: '#000000',
      size: 12
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -'
  });

  for (i = 0; i < list.length; i++) {
    worksheet.cell(i + 1, 1).string(list[i].code).style(style)
    worksheet.cell(i + 1, 2).string(list[i].desc).style(style)
  }

  workbook.write('products.xlsx')

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.USERNAME}`,
      pass: `${process.env.PASSWORD}`
    }
  });

  var mailOptions = {
    from: 'info@primepharmacy.gr',
    // to: 'giorgosv@primepharmacy.gr',
    to: 'manosverigos@hotmail.com',
    subject: `TOP προϊόντα με μηδενικό στοκ: ${list.length}`,
    text: `Αριθμός προϊόντων: ${list.length}\n\n`,
    attachments: [{
      path: '/Users/manosverigos/Desktop/Programming/JS/stockCheck/products.xlsx'
    }]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.mailer = mailer;