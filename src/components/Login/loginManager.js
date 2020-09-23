
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeFirebase = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig)
    }
}

  // Google Sign In
 export  const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then( res => {
       const {displayName,email} = res.user;
       const userInfo = {
            isSignIn: true,
            name: displayName,
            email: email
       }
       return userInfo
      })
      .catch( error =>  {
        return error
      });
};

  // FaceBook Sign In
  
  export const handleFacebookSignIn = () =>{
    const  facebookProvider = new firebase.auth.FacebookAuthProvider();
      return firebase.auth().signInWithPopup(facebookProvider)
      .then( res =>{
          const {displayName,email} = res.user;
          const userInfo = {
              isSignIn: true,
              name: displayName,
              email: email
          }
          return userInfo
        })
      .catch( error => {
         return error;
        });
  };

// Create User Sign in with email and password
  export const createUserWithEmailAndPassword = (email,password,firstName,lastName) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserIfno = res.user;
        newUserIfno.error = '';
        newUserIfno.success = true;
        updateUserName(firstName,lastName);
        return newUserIfno;
        
    })
    .catch(error => {
        let errorMessage = error.message;
        const newUserIfno = {};
        newUserIfno.error = errorMessage;
        newUserIfno.success = false;
        return newUserIfno
      });
  };

  // Sign in with email and password
  export const signInwithEmailAndPassword = (email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then( res =>{
        const newUserIfno = res.user;
        newUserIfno.error = '';
        newUserIfno.success = true;
        return newUserIfno;
    })
    .catch(function(error) {
        let errorMessage = error.message;
        const newUserIfno = {};
        newUserIfno.error = errorMessage;
        newUserIfno.success = false;
        return newUserIfno;
      });
  }

  // Update User Name
  const updateUserName = (firstName,lastName) =>{
    const user = firebase.auth().currentUser;
    let fullName = firstName + " " + lastName;
    user.updateProfile({
    displayName: fullName,
    }).then(function() {
        console.log("Update successful")
    }).catch(function(error) {
        console.log(error)
    });
}