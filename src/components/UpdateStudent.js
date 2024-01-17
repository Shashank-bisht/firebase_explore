import React, { useState } from "react";
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, set, update } from "firebase/database";
import { app } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // i am using location to get default data in the inputs
  const [name, setname] = useState(location.state[1].studentName);
  const [admno, setadmno] = useState(location.state[0]);
  const [phone, setphone] = useState(location.state[1].phoneNumber);
  const [selectedfile, setselectedfile] = useState();
  console.log(location);

  const handlefilechange = (e) => {
    const file = e.target.files[0];
    setselectedfile(file);
  };

  const submithandler = async (e) => {
    e.preventDefault();
    // if file is selected the update it
    if (selectedfile) {
      const db = getDatabase();
      const storage = getStorage(app);
      const myref = sRef(storage, `images/${location.state[0]}`);
      await uploadBytes(myref, selectedfile);
      const imageurl = await getDownloadURL(myref);
      // to reference a specific location in the database
      const studentRef = ref(db, "student/" + location.state[0]);
      // since update return a promise so we are using .then and catch
      update(studentRef, {
        studentName: name,
        phoneNumber: phone,
        imageurl: imageurl,
      })
        .then(() => {
          navigate("/dashboard/studentList");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // other wise update the data
      const db = getDatabase();
      // to reference a specific location in the database
      const studentRef = ref(db, "student/" + location.state[0]);
      update(studentRef, {
        studentName: name,
        phoneNumber: phone,
      })
        .then(() => {
          navigate("/studentList");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <form onSubmit={submithandler}>
        {/* the value is used to set the current value of the input field */}
        <input
          disabled
          value={admno}
          onChange={(e) => setadmno(e.target.value)}
          placeholder="student admission no."
          type="text"
        />
        <input
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="student name"
          type="text"
        />
        <input
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          placeholder="phone number"
          type="number"
        />
        <input type="file" onChange={handlefilechange} />
        <button type="submit">update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
