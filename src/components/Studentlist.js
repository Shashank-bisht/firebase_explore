import React, { useEffect } from "react";
import { useState } from "react";
import { getDatabase, onValue ,ref, remove, set} from "firebase/database";
import { app } from "../firebase";
const Studentlist = () => {
    const [studentdata, setstudentdata] = useState(null);
  useEffect(() => {
    const db = getDatabase();
   const studentref = ref(db, "student/");
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
                 </div>
                )
              })}
          </div>

      )}
    </div>
  );
};

export default Studentlist;
