/**
 * The Firestore database, used by the Blog, Messages and Search pages.
 * It is kept separate from firebase.ts so that the database code is only
 * downloaded when one of those pages is opened (lazy loading).
 */
import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);
