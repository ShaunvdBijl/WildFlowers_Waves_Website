// Intended path: /backend/config/firebase.js
//
// Initializes the Firebase Admin SDK so the backend can verify ID tokens
// issued by Firebase Authentication on the client. This is intentionally a
// thin wrapper - drop your real service account credentials in via env vars
// (never commit the JSON key file) before deploying.

const admin = require('firebase-admin');
const path = require('path');
let initialized = false;

function initFirebaseAdmin() {
  if (initialized) return admin;

  // Preferred: store the whole service account JSON (minified) in one env var.
  // Alternative: use individual FIREBASE_PROJECT_ID / CLIENT_EMAIL / PRIVATE_KEY vars.
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Env vars store literal "\n" - convert back to real newlines
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      }),
    });
  } else {
    console.warn(
      'Firebase Admin credentials not set - auth middleware will reject all requests until FIREBASE_SERVICE_ACCOUNT_JSON (or the individual FIREBASE_* vars) is configured.'
    );
    admin.initializeApp(); // allows the app to boot; token verification will fail until configured
  }

  initialized = true;
  return admin;
}

module.exports = initFirebaseAdmin();
