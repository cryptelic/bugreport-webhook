//Name of the file : sha256-hmac.js
let signature = "";
let uuid = "";
let stamp = "";
let api = "";
//Loading the crypto module in node.js
let crypto = require('crypto');
//creating hmac object 
let hmac = crypto.createHmac('sha256', api);
//passing the data to be hashed
data = hmac.update(stamp + uuid);
//Creating the hmac in the required format
gen_hmac = data.digest('hex');
//Printing the output on the console
console.log("hmac : " + gen_hmac);