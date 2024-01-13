import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, onValue ,ref, remove, set} from "firebase/database";
import { app } from "../firebase";
const Studentlist = () => {
    const [studentdata, setstudentdata] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
    const db = getDatabase();
    // initializing a reference to realtime database
   const studentref = ref(db, "student/");
//    onvalue is a listener, When the data changes, the callback function is executed with a snapshot containing the updated data on the screen .
   onValue(studentref, (snapshot) => {
       const data = snapshot.val()
       setstudentdata(data)
   })
  },[]);
  const deletedata = (key) => {
      const db = getDatabase();
      const studentref = ref(db, "student/" + key);
      remove(studentref)
  }
  return (
    <div>
      <h1>Students List </h1>
      {studentdata && (
          <div>
              {Object.entries(studentdata).map(([key,value]) => {
                return(
                 <div key={key}>
                    <p>{value.studentName}{value.phoneNumber}</p>
                    <button onClick={()=>deletedata(key)}>delete</button>
                    <button onClick={()=>{navigate('/updateStudent',{state:[key,value]})}}>Update</button>
                 </div>
                )
              })}
          </div>

      )}
    </div>
  );
};

export default Studentlist;
