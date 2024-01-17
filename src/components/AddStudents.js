import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";

import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
// The event parameter (commonly denoted as e or event) is a parameter passed to event handler functions in JavaScript. It provides information about the event that occurred, such as mouse clicks, keyboard input, or form submissions.
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";



const AddStudents = () => {
  const [name, setname] = useState("");
  const [admno, setadmno] = useState(null);
  const [phone, setphone] = useState(null);
  const [selectedfile, setselectedfile] = useState(null);
  const navigate = useNavigate();

  const handlefilechange = (e) => {
    const file = e.target.files[0];
    setselectedfile(file);
  };
  const submithandler = async (e) => {
    e.preventDefault();
    // to get the reference with the realtime database
    const db = getDatabase();
    // storage is refering to firebase storage
    const storage = getStorage(app);
    // sRef is used to create reference to the image folder with the filename based on admno value
    const myref = sRef(storage, `images/${admno}`);
  // this uploads the file at the reference location which is myref
    await uploadBytes(myref, selectedfile);
    const imageurl = await getDownloadURL(myref);
    // set return a promise and is used for setting data
    // ref is used to get the reference of the database at a particular location like student
    set(ref(db, "student/" + admno), {
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
    // console.log(name, phone)
  };
  return (
    <div>
      <form onSubmit={submithandler}>
        <input
          onChange={(e) => setadmno(e.target.value)}
          placeholder="student admission no."
          type="text"
        />
        <input
          // By using a callback function inside onChange, you ensure that you capture the latest value of e.target.value when the actual change occurs
          onChange={(e) => setname(e.target.value)}
          placeholder="student name"
          type="text"
        />
        <input
          onChange={(e) => setphone(e.target.value)}
          placeholder="phone number"
          type="number"
        />
        <input onChange={handlefilechange} type="file" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStudents;
