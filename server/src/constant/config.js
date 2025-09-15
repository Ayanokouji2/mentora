
const options = {
  httpOnly: true,
  secure: false,
  maxAge: 1000 * 60 * 30,
};

const PORT = process.env.PORT || 5000;

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const MONGO_URI = process.env.MONGO_URI;

const SENDER_MAIL=process.env.SENDER_MAIL

const PASSWORD=process.env.PASSWORD



export {
  options,
  PORT,
  ADMIN_SECRET_KEY,
  JWT_SECRET_KEY,
  MONGO_URI,
  SENDER_MAIL,
  PASSWORD,
};
