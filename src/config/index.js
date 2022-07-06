module.exports = {
  port: process.env.PORT || 5000,
  jwtKey: process.env.JWT_SECRET_KEY,
  mongodbUri: process.env.MONGODB_URI
};
