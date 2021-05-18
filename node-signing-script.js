const crypto = require('crypto');
const fs = require('fs');

// will default to 2048 bits
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', { modulusLength:2048 });

// it's missing some data but we can add on it later
const sampleString = "POST https://test.com/?test=hello 8989898098a.2020 2020-12-24T09:46:52.308Z {amount:'100'}";

const signature = crypto.sign('sha256', Buffer.from(sampleString), { key:privateKey });

const baseSignature = signature.toString('base64');

const fromBase64 = new Buffer(baseSignature, 'base64');

//const verify = crypto.verify('sha256', Buffer.from(sampleString), publicKey, fromBase64);

//console.log(verify);



/**
 * Testing if we can verify signature generated from openssl
 *
 */
const terminalPublicKey = fs.readFileSync('./client_public_key_php_dotnet.pem', { encoding:'utf8' });
const signedBase64 = fs.readFileSync('./signedRequest', { encoding:'utf8' });

const signed256 = new Buffer(signedBase64, 'base64');
const testVerify = crypto.verify('sha256', Buffer.from(sampleString), terminalPublicKey, signed256);

console.log(testVerify);
