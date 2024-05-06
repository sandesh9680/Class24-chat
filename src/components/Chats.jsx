import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());

const Chats = ({ selectedUser }) => {
  const [chats, setChats] = useState([]);


  const { dispatch } = useContext(ChatContext);
  const [selectedUserMessage, setSelectedUserMessage] = useState()
  const [filteredMessage, setFilteredMessage] = useState()


  useEffect(() => {
    get(child(dbRef, `supportChat/messages`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log('alldata.admin messages', snapshot.val());
        let userMessageArray = [];
        for (const [key, value] of Object.entries(snapshot.val())) {
          if (selectedUser && key == selectedUser?.id) {
            userMessageArray.push(value)
          }
        }
        // console.log("userMessageArray", snapshot.val());
        userMessageArray[0] && setSelectedUserMessage(userMessageArray[0])
      } else {
        console.log("No data available");
      }

    }).catch((error) => {
      console.error(error);
    });

  }, [selectedUser])

  useEffect(() => {
    let filtermessage = [];
    if (selectedUserMessage && selectedUserMessage?.length > 0)
      for (const [key, value] of Object.entries(selectedUserMessage[1])) {
        filtermessage.push(value)
      }
    setFilteredMessage(filtermessage)
    // console.log('filtermessage', filtermessage);
  }, [selectedUserMessage])

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setChats(doc.data());
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  // const handleSelect = (u) => {
  //   dispatch({ type: "CHANGE_USER", payload: u });
  // };

  return (
    <div className="chats">
      {/* {
        filteredMessage?.map((msg) => {
          return (
            <div
              className="userChat"
              key={msg.messageId}
            >
              <img src={msg.userImage} alt="" />
              <div className="userChatInfo">
                <span>{msg.senderName}</span>
                <p>{msg.message}</p>
              </div>
            </div>
          )
        })
      } */}
    </div>
  );
};

export default Chats;
