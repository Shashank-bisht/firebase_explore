import React, { useEffect } from 'react'
import { app } from '../firebase'
import { useState } from 'react'
import {collection, doc, getDocs, getFirestore, deleteDoc} from 'firebase/firestore'
import { useNavigate } from "react-router-dom";


const FacultyList = () => {
const navigate = useNavigate()

    const [facultydata, setfacultydata] = useState([]);
    const getdata = async () => {
        const db = getFirestore(app);
        // Use the collection function to get a reference to the 'faculty' collection
        const facultyCollection = collection(db, "faculty");
        // getDocs to get all the documents
        const docsnap = await getDocs(facultyCollection);
        // console.log(docsmap) docsmap is a object
      // using docs is a convention in firebase
        const data = docsnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    //...doc.data() creates a new object by copying all the properties from the object returned by doc.data().

        // console.log(data);
        setfacultydata(data)
    };
    const deletedata=async(id)=>{
        const db = getFirestore(app);
        const docRef = doc(db, "faculty", id);
        await deleteDoc(docRef)
         getdata()
    }
    useEffect(
        () => {
      getdata()
    },[])
  return (
    <div>
        <h1>faculty list</h1>
        {/* data is an object but facultydata is an array of objects */}
        {facultydata.map((data)=>{
            return <div key={data.id}>
              <p>Name :  {data.facultyname}</p>
              <p>phone :  {data.phonenumber}</p>
              <button onClick={()=>deletedata(data.id)}>Delete</button>
              <button onClick={()=>{navigate('/dashboard/updatefaculty',{state:data})}}>Update</button>
              </div>
        })}
    </div>

  )
}

export default FacultyList