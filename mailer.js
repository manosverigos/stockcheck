var nodemailer = require('nodemailer');
require('dotenv').config()

mailer = (list) => {

  let text = `Αριθμός προϊόντων: ${list.length}\n`;

  for (let prod of list) {
    text += `${prod.code}: ${prod.desc} \n`
  }


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.USERNAME}`,
      pass: `${process.env.PASSWORD}`
    }
  });

  var mailOptions = {
    from: 'info@primepharmacy.gr',
    to: 'info@primepharmacy.gr',
    subject: 'TOP προϊόντα με μηδενικό στοκ',
    text: text
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