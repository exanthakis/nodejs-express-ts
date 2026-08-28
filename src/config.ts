export default {
  port: Number(process.env.PORT) || 5001,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173/',
  dbUri: process.env.DB_URI || 'mongodb://127.0.0.1:27017/rest-api-db',
  saltWorkFactor: Number(process.env.SALT_WORK_FACTOR) || 10,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '15m',
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL || '1y',
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY || '',
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY || '',
};
