import { getApps } from "firebase-admin/app";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT_DATA as string
);

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminDb = admin.firestore();

export { adminDb };
