export default {
  port: 5001,
  dbUri: "mongodb://127.0.0.1:27017/rest-api-db",
  saltWorkFactor: 10, // how many round to sal psw
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: "",
  accessTokenPublicKey: "",
  refreshTokenPrivateKey: "",
  refreshTokenPublicKey: "",
};
