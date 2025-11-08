import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import { jwtSecretKey, refreshTokenSecretKey } from '../../config/index.js';

console.log('JWT Secret Key:', jwtSecretKey);

export function signAccessToken(userId) {
  const accessToken = sign(
    { _id: userId },
    jwtSecretKey,
    {
      expiresIn: '1h',
    }
  );
  return accessToken;
}
export function signRefreshToken(userId) {
  const refreshToken = sign(
    { _id: userId },
    refreshTokenSecretKey,
    {
      expiresIn: '7d',
    }
  );
  return refreshToken;
}
export function signConfirmCodeToken(userId, confirmCode) {
  const confirmCodeToken = sign(
    { _id: userId, code: confirmCode },
    jwtSecretKey,
    {
      expiresIn: '5m',
    }
  );
  return confirmCodeToken;
}

export function decodeAccessToken(accessToken) {
  try {
    const accessTokenClean = accessToken.replace('Bearer ', '');
    const decoded = verify(accessTokenClean, jwtSecretKey);
    return decoded;
  } catch (error) {
    console.error('Error decoding access token:', error.message);
    return null;
  }
}
