import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import {BS_API_KEY, FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, GOOGLE_TENENT_ID} from "../constants";
import {
    browserLocalPersistence,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    setPersistence,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    updatePassword,
    FacebookAuthProvider,
    OAuthProvider
} from "@firebase/auth";
import {clearLocalCart} from "../utils/localCart";
import {client} from "../apollo/client";
import {ADD_VISITOR} from "../apollo/mutations/addVisitor";

const firebaseApp = initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN
});

const firebaseAuth = getAuth(firebaseApp);

onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        client.mutate({mutation: ADD_VISITOR});
    } else {
        // User is signed out
        // ...
    }
});

export const getCurrentAuth = async () => {
    firebaseAuth.tenantId = GOOGLE_TENENT_ID!;
    await setPersistence(firebaseAuth, browserLocalPersistence);
    return firebaseAuth;
}

export const isServer = typeof window === 'undefined';

export const getLoginUrl = () => {
    if (isServer) {
        return '/login'
    }
    return `/login?callback=${window.location.href}`;
}

export const changePasswordSignIn = async (oldPassword: string) => {
    const firebaseAuth = await getCurrentAuth();
    await signInWithEmailAndPassword(firebaseAuth, firebaseAuth.currentUser?.email, oldPassword);
}

export const changePassword = async (oldPassword: string, newPassword: string) => {
    const firebaseAuth = await getCurrentAuth();
    await signInWithEmailAndPassword(firebaseAuth, firebaseAuth.currentUser?.email, oldPassword);
    await updatePassword(firebaseAuth.currentUser, newPassword);
}

export const signUp = async (email: string, password: string, name: string): Promise<any> => {
    const firebaseAuth = await getCurrentAuth();
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return await updateProfile(firebaseAuth.currentUser, {displayName: name});
}

export const signInWithEmail = async (email: string, password: string): Promise<any> => {
    const firebaseAuth = await getCurrentAuth();
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
}

export const signInWithGoogle = async (): Promise<any> => {
    const firebaseAuth = await getCurrentAuth();
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return signInWithPopup(firebaseAuth, provider);
}

export const signInWithFacebook = async (): Promise<any> => {
    const firebaseAuth = await getCurrentAuth();
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });
    return signInWithPopup(firebaseAuth, provider);
}

export const signInWithApple = async (): Promise<any> => {
    const firebaseAuth = await getCurrentAuth();
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    provider.setCustomParameters({
        display: 'popup'
    });
    return signInWithPopup(firebaseAuth, provider);
}

export const signInAsGuest = async (): Promise<any> => {
    const firebaseAuth = await getCurrentAuth();
    return signInAnonymously(firebaseAuth);
}

export const signInAsGuestIfNoCurrentUser = async (): Promise<any> => {
    const firebaseAuth = await getCurrentAuth();
    if (!firebaseAuth.currentUser) {
        await signInAnonymously(firebaseAuth);
        console.log('signInAsGuest');
    }
}

export const setIsUserSignedIn = () => {
    localStorage.setItem('isUserSignedIn', 'true');
}

export const isUserSignedIn = () => {
    return localStorage.getItem('isUserSignedIn') === 'true';
}

export const isAnonymousUser = async (): Promise<boolean> => {
    const firebaseAuth = await getCurrentAuth();
    if (firebaseAuth.currentUser) {
        return firebaseAuth.currentUser.isAnonymous;
    }
    return false;
}

export const getCurrentUser = async () => {
    const firebaseAuth = await getCurrentAuth();
    if (firebaseAuth.currentUser) {
        return firebaseAuth.currentUser;
    }
    return undefined;
}

export const getUsername = async () => {
    const firebaseAuth = await getCurrentAuth();
    if (firebaseAuth.currentUser) {
        return firebaseAuth.currentUser.displayName;
    }
    return false;
}

export const handleSignOut = async () => {
    const firebaseAuth = await getCurrentAuth();
    await firebaseAuth.signOut();
    localStorage.removeItem('isUserSignedIn');
    clearLocalCart();
    window.location.href = '/login';
}

export const getTokenAfterSignIn = async () => {
    const firebaseAuth = await getCurrentAuth();
    if (firebaseAuth.currentUser) {
        return await firebaseAuth.currentUser?.getIdToken(true);
    } else {
        // console.log('ERROR no firebaseAuth.currentUser');
        // window.location.href = '/login';
        // return '';
    }
}

export const getHeaders = async () => {
    let token;
    if (!isServer) {
        token = await getTokenAfterSignIn();
    }
    return {
        'x-api-key': BS_API_KEY,
        bschannel: 'WEB_STORE',
        Authorization: token,
    }
};
