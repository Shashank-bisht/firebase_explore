import React from 'react'

import { useState } from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {app} from '../firebase'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const submithandler = (e) => {
    e.preventDefault();
    const auth = getAuth(app)
    signInWithEmailAndPassword(auth, email, password).then(res=>{
      // navigate('/user')
      console.log(res.user)
      navigate('/dashboard')
    }).catch(err=>{
      console.log(err)
      
    })
  };

  return (
    <div>
      <h1>login</h1>
      <form onSubmit={submithandler}>
        <input
          onChange={(e) => setemail(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login