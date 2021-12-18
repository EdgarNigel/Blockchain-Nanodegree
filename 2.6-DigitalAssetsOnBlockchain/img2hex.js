// Require file system access
const fs = require('fs');
// Read file buffer 
const imgReadBuffer = fs.readFileSync('test-pattern.jpeg');
// Encode image buffer to hex
const imgHexEncode = new Buffer(imgReadBuffer).toString('hex');
// Output encoded data to console
console.log(imgHexEncode);
// Decode hex
const imgHexDecode = new Buffer(imgHexEncode, 'hex');
// Save decoded file file system 
fs.writeFileSync('test-pattern-decoded.jpeg', imgHexDecode);