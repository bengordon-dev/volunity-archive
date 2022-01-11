import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  // no way josé
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const createUser = async (email, password, success, failure) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        success(user);
        // ...
      })
  } catch(err) {
    console.error(err);
    failure();
  }
}

const signIn = async (email, password, success, failure) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      success(user);
    });
  } catch (err) {
    console.error(err);
    failure();
  }
};

export {createUser, signIn};