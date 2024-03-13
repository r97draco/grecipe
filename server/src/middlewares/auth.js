const e = require('express');
const admin = require('firebase-admin');

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const authMiddleware = async (req, res, next) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

module.exports = authMiddleware;
