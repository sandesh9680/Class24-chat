import React, { useContext, useEffect, useState } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  const [admin, setAdmin] = useState();


  useEffect(() => {
    get(child(dbRef, `supportChat/admin`)).then((snapshot) => {
      if (snapshot.exists()) {
        setAdmin(snapshot.val()[1])
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }, [])
  return (
    <div className='navbar'>
      {/* <span className="logo">Lama Chat</span> */}
      <div className="user">
        {/* <img src={alldata.admin} alt="" /> */}
        <span>{admin?.userName} chat</span>
        {/* <span>{admin?.userEmail}</span> */}
        {/* <button onClick={() => signOut(auth)}>logout</button> */}
      </div>
    </div>
  )
}

export default Navbar