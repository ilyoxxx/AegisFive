const crypto = require('crypto');
const SECRET = 'CHANGE_THIS_SECRET';

module.exports.encrypt = (payload) => {
    const cipher = crypto.createCipher('aes-256-ctr', SECRET);
    return cipher.update(JSON.stringify(payload), 'utf8', 'hex');
};

module.exports.decrypt = (hash) => {
    const decipher = crypto.createDecipher('aes-256-ctr', SECRET);
    return JSON.parse(decipher.update(hash, 'hex', 'utf8'));
};
