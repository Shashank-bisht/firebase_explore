import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";

const Studentlist = () => {
  const [studentdata, setstudentdata] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const db = getDatabase();
    // initializing a reference to realtime database
    const studentref = ref(db, "student/");
    // onvalue is a listener, When the data changes, the callback function is executed with a snapshot containing the updated data on the screen .
    onValue(studentref, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      // onValue and .val both are function provided by firebase
      setstudentdata(data);
    });
  }, []);
  const deletedata = (key) => {
    const db = getDatabase();
    const studentref = ref(db, "student/" + key);
    remove(studentref);
  };

  return (
    <div>
      <h1>Students List </h1>
      {studentdata && (
        <div>
          {/* Object.entries is a method provided by javascript to convert objects into arrays */}
          {Object.entries(studentdata).map(([key, value]) => {
            return (
              <div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", gap: "3px" }} key={key}>
                <p>
                  {value.studentName} {value.phoneNumber}
                </p>
                <img style={{ width: "100px", height: "100px" }} src={value.imageurl} alt="" />
                <button onClick={() => deletedata(key)}>delete</button>
                <button
                  onClick={() => {
                    // passing state information to target route
                    navigate("/updateStudent", { state: [key, value] });
                  }}
                >
                  Update
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Studentlist;
