import React, { useContext, useEffect, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { getDatabase, ref, child, get } from "firebase/database";
const dbRef = ref(getDatabase());


const Chat = ({ selectedUser }) => {
  const { data } = useContext(ChatContext);
  const [selectedUserMessage, setSelectedUserMessage] = useState()
  const [filteredMessage, setFilteredMessage] = useState()
  const [callMessageApiAgain, setCallMessageApiAgain] = useState(false)


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
        // console.log("userMessageArray", userMessageArray[0] && userMessageArray[0][1]);
        userMessageArray[0] && setSelectedUserMessage(userMessageArray[0])
      } else {
        console.log("No data available");
      }

    }).catch((error) => {
      console.error(error);
    });

  }, [selectedUser, callMessageApiAgain])

  useEffect(() => {
    let filtermessage = [];
    if (selectedUserMessage && selectedUserMessage?.length > 0)
      for (const [key, value] of Object.entries(selectedUserMessage[1])) {
        filtermessage.push(value)
      }
    const SortingFiltermessage = filtermessage.sort((a, b) => { return a.messageTime - b.messageTime })
    setFilteredMessage(filtermessage)
    // console.log('filtermessage', SortingFiltermessage);
  }, [selectedUserMessage, callMessageApiAgain])


  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{selectedUser?.userName}</span>
        <div className="chatIcons">
          {/* <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" /> */}
        </div>
      </div>
      <Messages filteredMessage={filteredMessage} />
      <Input selectedUserMessage={selectedUserMessage} setCallMessageApiAgain={setCallMessageApiAgain} callMessageApiAgain={callMessageApiAgain} selectedUser={selectedUser} />
    </div>
  );
};

export default Chat;
