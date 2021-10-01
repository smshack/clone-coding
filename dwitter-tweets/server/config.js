const dotenv = require('dotenv');
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}
const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expriesInSec: required('JWT_EXPRIRES_SEC'),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 30010)),
  },
};

module.exports.config = config;
