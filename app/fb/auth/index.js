import firebase from 'react-native-firebase';
import Auth from '../config/auth';

const fbLoginPermissions = ['email'];

var common = '';

export function handleFbLogin() {
  Auth.Facebook.login(['email'])
    .then((token) => {
      console.log(token);
      firebase.auth()
        .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
        .catch((err) => {
          if(err.code === 'auth/account-exists-with-different-credential') {
      alert("An account is already in use with the email id. Use the same social login");
          }
        })
    })
    .catch((err) => {
      console.log(err.code);   
    })
};

export function emailRed() {
  debugger;
  return common;
}