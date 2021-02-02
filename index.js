// var https = require('https');
const axios = require('axios')
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
const prod = require('./list.js');
const m = require('./mailer.js')




// getXML = async () => {

//   let products = [];
//   var data = '';

//   await https.get('https://www.primepharmacy.gr/skroutz/xml', async function (res) {
//     if (res.statusCode >= 200 && res.statusCode < 400) {
//       await res.on('data', function (data_) {
//         data += data_.toString();
//       });
//       await res.on('end', async function () {
//         //console.log('data', data);
//         await parser.parseString(data, async function (err, result) {
//           //console.log('FINISHED', err, result);
//           const product_list = await result['mywebstore']['products'][0]['product']
//           for (i = 0; i < product_list.length; i++)
//             await products.push(product_list[i]['uid'][0])
//         });
//       });
//     }
//   });
//   return products
// }

getXML = async () => {

  let products = [];
  var data = '';

  await axios.get('https://www.primepharmacy.gr/skroutz/xml').then((res) => data += res.data.toString()).catch((err) => {
    console.error(err)
  })

  parser.on('error', function (err) {
    console.log('Parser error', err);
  });

  parser.parseString(data, async function (err, result) {
    const product_list = await result['mywebstore']['products'][0]['product']

    for (i = 0; i < product_list.length; i++) {
      products.push(product_list[i]['uid'][0])
    }
  })
  return products
}

createList = async () => {

  prods = await getXML()

  let obj_to_email = []

  for (let product of prod.genProducts()) {
    if (!prods.includes(product['Κωδικός'])) {
      product_obj = {
        code: product['Κωδικός'],
        desc: product['Περιγραφή']
      }
      obj_to_email.push(product_obj)
    }
  }
  m.mailer(obj_to_email)
}

createList()