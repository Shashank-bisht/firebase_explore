import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { app } from '../firebase';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState(null);
  const [isOtp, setIsOtp] = useState(false);
  const [code, setCode] = useState("");
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
  const sendotp =  () => {
    const auth = getAuth(app);
    const appVerifier = new RecaptchaVerifier(auth, "recaptcha-container",{});
    signInWithPhoneNumber(auth, phone,appVerifier ).then(res => {
      window.confirmationResult = res;
      console.log(res);
      console.log("otp sent")
      navigate('/dashboard');
      setIsOtp(true)
    }).catch(err => {
        console.log(err);
    })
  }

  const confirmOtp =()=>{
 window.confirmationResult.confirm(code).then((res)=>{
   console.log(res)
 }).catch((err)=>{
   console.log(err)
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
{!isOtp ?
      <div>
        <h1>login with otp</h1>
        <input
          type="text"
          onChange={(e) => setphone(e.target.value)}
          placeholder="phone number"
        />
        <div id="recaptcha-container"></div>
        <button type="button" onClick={sendotp}>
          send otp
        </button>
      </div>
:
<div>
<h3>Confirm OTP</h3>
<input type="text" onChange={(e)=>setCode(e.target.value)} />
<button type="button" onClick={confirmOtp}>Submit otp</button>
</div>
}
    </div>
  );
};

export default Login;
