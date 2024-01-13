import React, { useState } from 'react'
import {getDatabase, ref, set, update} from 'firebase/database'
import { app } from '../firebase'
import { useNavigate , useLocation} from 'react-router-dom'
const UpdateStudent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [name, setname] = useState(location.state[1].studentName)
    const [admno, setadmno] = useState(location.state[0])
    const [phone, setphone] = useState(location.state[1].phoneNumber)
    console.log(location)
    const submithandler=(e)=>{
        e.preventDefault();
        const db = getDatabase(app)
        const studentRef = ref(db, 'student/' + location.state[0])
        update(studentRef, {
            studentName: name,
            phoneNumber: phone
        }).then(()=>{
            navigate('/studentList')
        }).catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div>
        <form onSubmit={submithandler}>
            <input disabled value={admno} onChange={(e)=>setadmno(e.target.value)} placeholder='student admission no.' type="text" />
            <input value={name} onChange={(e)=>setname(e.target.value)} placeholder='student name' type="text" />
            <input value={phone} onChange={(e)=>setphone(e.target.value)} placeholder='phone number' type="number" />
            <button type="submit">update</button>
        </form>
    </div>
  )
}

export default UpdateStudent