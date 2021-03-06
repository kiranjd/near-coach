import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

export const hangleGoogleLogIn = () => {
  GoogleSignin.configure({
    webClientId: '819855999384-l6r65jt5s62u68d8r850j04ahi03icec.apps.googleusercontent.com',
    iosClientId: '',
    //offlineAccess: true,
    //forceConsentPrompt: true,
})
  GoogleSignin.signIn()
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // Login with the credential
      firebase.auth()
        .signInWithCredential(credential)
        .catch((err) => {
          if(err.code === 'auth/account-exists-with-different-credential') {
      alert("An account is already in use with the email id. Use the same social login");
          }
        })
    })
    .then((user) => {
        console.log(user);
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(error);
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}