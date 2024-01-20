import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import {getFirestore, updateDoc, doc} from 'firebase/firestore'
import { app } from '../firebase'
import { useLocation } from 'react-router-dom'

const UpdateFaculty = () => {
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location)
    // i am using location to get default data in the inputs and this state is passed from faculty list component
    const [name,setName]=useState(location.state.facultyname)
    const [phone,setPhone] = useState(location.state.phonenumber)
    
    const submithandler=async(e)=>{
        e.preventDefault();
    console.log(name, phone)
    const db = getFirestore(app);
    const docRef = doc(db, "faculty", location.state.id);
    await updateDoc(docRef, {
        facultyname: name,
        phonenumber: phone
    })
     navigate("/dashboard/facultyList")
    }
  return (
    <div>
        <h1>
            Update Faculty
        </h1>
        <form onSubmit={submithandler}>
            <input value={name} type="text" onChange={(e)=>setName(e.target.value)} placeholder='Full name' />
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" placeholder='number' />
            <button type="submit">update</button>
        </form>

    </div>
  )
}

export default UpdateFaculty