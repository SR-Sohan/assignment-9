import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Header from '../Header/Header';
import './Login.css'
import { UserContext } from '../../App';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, initializeFirebase, signInwithEmailAndPassword } from './loginManager';



const Login = () => {
    //initialze Firebase
    initializeFirebase();

    // History State and Location State
    const history = useHistory();
    const location = useLocation();

    // From Location
    let { from } = location.state || { from: { pathname: "/" } };

   //User Context Api
    const {state1,state2}= useContext(UserContext);
    const[loggedUser,setLoggedUser] = state1;

    // React Hook Form
    const { register, handleSubmit,watch,  errors } = useForm();

    //New User
    const [newUser,setNewUser] = useState(true)

    // User State
    const [user,setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

  // Google Sign in
  const googleSignIn = ()=>{
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res,true)
      })
  };

  // Facebook Sign In
  const facebookSignIn = ()=>{
      handleFacebookSignIn()
      .then( res =>{
        handleResponse(res,true)
      })
  }
  // Handle Response 
  const handleResponse = (res,redirect) =>{
      setUser(res);
      setLoggedUser(res);
      if(redirect){
          history.push(from);
      }
  };

   // Form Submit
    const onSubmit = (data,e) => {
      if(newUser && watch('email') && watch('password')){
       createUserWithEmailAndPassword(watch('email'),watch('password'),watch('firstName'),watch('lastName'))
       .then( res =>{
            setUser(res);
            setNewUser(false);
       })
      };

      if(!newUser && watch('email') && watch('password')){
        signInwithEmailAndPassword(watch('email'),watch('password'))
        .then(res => {
            handleResponse(res,true)
        })
      }
      e.preventDefault();
    };

   
    return (
        <div className="login-area">
            <Header/>
            <Container> 
                <div className="create-user"> 
                    <h3 className="text-center">Create an account</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        { newUser && <input name="firstName"   ref={register({required: true})} placeholder="First Name" />}
                        {errors.firstName && <span className="error">Please write your first name</span>}
                        <br/>

                        { newUser && <input name="lastName"  ref={register({ required: true })} placeholder="Last Name" />}
                        {errors.lastName && <span className="error">Please write your last name</span>}
                        <br/> 

                        <input type="email" placeholder="Email"   name="email" ref={register({pattern: /\S+@\S+\.\S+/})} />
                        {errors.email && <span className="error">Please write correct email</span>}
                        <br/>

                        <input name="password"   type='password' placeholder="Passowrd"
                         ref={register({
                             required: true,
                             pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                         })} />
                         {errors.password && <span className="error">Minimum eight characters, at least one letter and one number</span>}
                         <br/>

                       { newUser && <input name="password2" type='password' placeholder="Confirm Password" ref={register({
                        required: true,
                        validate: (value) => {
                            return value === watch('password');}})} />}
                            {errors.password2 && <span className="error"> Password didn't match </span>}
                        <br/>

                        <input type="submit" value={newUser ? "Create an account" : "Login" }/>
                    </form>
                    <p className="text-center">{ newUser ? 'Already have an account?' : "Don't have an account?"} <span onClick={()=> setNewUser(!newUser)}>{ newUser ?'Login' : 'Create an account'}</span></p>
                </div>
                <div className="or-area ">
                    <p>Or</p>
                </div>
                <div className="social-section">
                       <div onClick={googleSignIn}  className="social google-section"> 
                            <img src={require('../../images/Icon/google.png')} alt="" />
                            <span>Login with Google</span>
                       </div>
                       <div onClick={facebookSignIn} className=" social facebokk-section"> 
                            <img src={require('../../images/Icon/fb.png')} alt="" />
                            <span>Login with FaceBook</span>
                       </div>
                   </div>
            </Container>
        </div>
    );
};

export default Login;