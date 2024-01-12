import React, { useState } from 'react'
import {getDatabase, ref, set} from 'firebase/database'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
const AddStudents = () => {
    const [name, setname] = useState('')
    const [admno, setadmno] = useState(null)
    const [phone, setphone] = useState(null)
    const navigate = useNavigate()
    const submithandler=(e)=>{
        e.preventDefault();
        const db = getDatabase()
        // set return a promise

        set(ref(db, 'student/' + admno), {
            studentName: name,
            phoneNumber: phone
        }).then(()=>{
            navigate('/studentList')
        }).catch((error)=>{
            console.log(error)
        })
        // console.log(name, phone)
    }
  return (
    <div>
        <form onSubmit={submithandler}>
            <input onChange={(e)=>setadmno(e.target.value)} placeholder='student admission no.' type="text" />
            <input onChange={(e)=>setname(e.target.value)} placeholder='student name' type="text" />
            <input onChange={(e)=>setphone(e.target.value)} placeholder='phone number' type="number" />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddStudents