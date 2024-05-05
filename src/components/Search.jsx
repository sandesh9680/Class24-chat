import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db, dbreal } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
const Search = ({ setSelectedUserState }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);





  useEffect(() => {
    get(child(dbRef, `supportChat/user`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log('alldata.admin search', snapshot.val());
        let userArray = [];
        for (const [key, value] of Object.entries(snapshot.val())) {
          userArray.push(value)
        }
        setUser(userArray);
        setUserList(userArray)
      } else {
        console.log("No data available");
      }

    }).catch((error) => {
      console.error(error);
    });

  }, [])

  const handleSearch = async (name) => {

    if (name == '') {
      setUser(userList)
    } else {
      // console.log("user++++", user);
      const q = user?.filter((item) => item?.userName?.includes(name));
      // console.log("qqq", q);
      setUser(q);
    }
  };

  const handleSelectUser = (data) => {
    setSelectedUser(data)
    setSelectedUserState(data)
    localStorage.setItem('selectedUser', JSON.stringify(data))
  }



  // const handleSelect = async () => {
  //   //check whether the group(chats in firestore) exists, if not create
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;
  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));

  //     if (!res.exists()) {
  //       //create a chat in chats collection
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

  //       //create user chats
  //       await updateDoc(doc(db, "userChats", currentUser.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           photoURL: user.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });

  //       await updateDoc(doc(db, "userChats", user.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: currentUser.uid,
  //           displayName: currentUser.displayName,
  //           photoURL: currentUser.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //     }
  //   } catch (err) { }

  //   setUser(null);
  //   setUsername("")
  // };



  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => { setUsername(e.target.value); handleSearch(e.target.value) }}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        user.map((data) => {
          return (
            <div className="userChat" onClick={() => { handleSelectUser(data) }}>
              <img src={data.userImage} alt="" />
              <div className="userChatInfo">
                <span>{data.userName}</span>
              </div>
            </div>
          )
        })
      )}
    </div>
  );
};

export default Search;
