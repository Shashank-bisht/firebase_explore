import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { app } from '../firebase';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res.user);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };
  const sendotp = async () => {
    const auth = getAuth(app);
    const appVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);
    signInWithPhoneNumber(auth, phone, appVerifier).then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      console.log(confirmationResult);
    }).catch(err => {
        console.log(err);
    })
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit">Submit</button>
        <br />
        <button onClick={signInWithGoogle}>Login with Google</button>
      </form>
      <br />
      <h1>login with otp</h1>
      <input type="text" onChange={(e) => setphone(e.target.value)} placeholder="phone number"/>
      <button type="button" onClick={sendotp}>send otp</button>
    </div>
  );
};

export default Login;
