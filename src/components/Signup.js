import React from "react";
import { useState } from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from '../firebase'
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const submithandler = (e) => {
    e.preventDefault();
    const auth = getAuth(app)
    createUserWithEmailAndPassword(auth, email, password).then(res=>{
      navigate('/login')
      console.log(res.user)
    }).catch(err=>{
      console.log(err)
    })
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
};

export default Signup;
