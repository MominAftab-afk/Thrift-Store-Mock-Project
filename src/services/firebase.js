/**
 * FIREBASE INITIALIZER
 * Gracefully initializes Firebase App, Firestore, Auth, and Storage
 * when environment variables are supplied. Falls back safely if not configured.
 */

let app = null;
let db = null;
let auth = null;
let storage = null;

const isConfigured = Boolean(
  typeof import.meta !== 'undefined' &&
  import.meta.env?.VITE_FIREBASE_API_KEY &&
  !import.meta.env?.VITE_FIREBASE_API_KEY?.includes('MOCK')
);

export async function initFirebase() {
  if (!isConfigured) {
    return { app: null, db: null, auth: null, storage: null, isConfigured: false };
  }

  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');
    const { getAuth } = await import('firebase/auth');
    const { getStorage } = await import('firebase/storage');

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    }
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);

    return { app, db, auth, storage, isConfigured: true };
  } catch (err) {
    console.warn("Firebase initialization warning (using local fallback store):", err);
    return { app: null, db: null, auth: null, storage: null, isConfigured: false };
  }
}

export { isConfigured };
