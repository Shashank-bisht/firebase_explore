import React, { useState } from 'react'
import {collection, addDoc, getFirestore} from 'firebase/firestore'
import { app } from '../firebase'

const AddFaculty = () => {
    const [name,setName]=useState('')
    const [phone,setPhone] = useState(null)
    
    const submithandler=async(e)=>{
        e.preventDefault();
    console.log(name, phone)
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "faculty"), {
        facultyname: name,
        phonenumber: phone
    })
    console.log(docRef,docRef.id)
    }
  return (
    <div>
        <h1>
            Add Faculty
        </h1>
        <form onSubmit={submithandler}>
            <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Full name' />
            <input onChange={(e)=>setPhone(e.target.value)} type="text" placeholder='number' />
            <button type="submit">submit</button>
        </form>
    </div>
  )
}

export default AddFaculty