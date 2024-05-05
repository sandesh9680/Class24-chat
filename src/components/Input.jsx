import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getDatabase, ref, set } from "firebase/database";

const dbRef = ref(getDatabase());

const Input = ({ selectedUserMessage, setCallMessageApiAgain, callMessageApiAgain, selectedUser }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log('selectedUserMessage+++', selectedUserMessage?.length > 0 && selectedUserMessage)



  const handleSend = async () => {
    // if (img) {
    //   const storageRef = ref(storage, uuid());

    //   const uploadTask = uploadBytesResumable(storageRef, img);

    //   uploadTask.on(
    //     (error) => {
    //       //TODO:Handle Error
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         await updateDoc(doc(db, "chats", data.chatId), {
    //           messages: arrayUnion({
    //             id: uuid(),
    //             text,
    //             senderId: currentUser.uid,
    //             date: Timestamp.now(),
    //             img: downloadURL,
    //           }),
    //         });
    //       });
    //     }
    //   );
    // } else {
    //   await updateDoc(doc(db, "chats", data.chatId), {
    //     messages: arrayUnion({
    //       id: uuid(),
    //       text,
    //       senderId: currentUser.uid,
    //       date: Timestamp.now(),
    //     }),
    //   });
    // }
    // await updateDoc(doc(db, "userChats", currentUser.uid), {
    //   [data.chatId + ".lastMessage"]: {
    //     text,
    //   },
    //   [data.chatId + ".date"]: serverTimestamp(),
    // });
    // await updateDoc(doc(db, "userChats", data.user.uid), {
    //   [data.chatId + ".lastMessage"]: {
    //     text,
    //   },
    //   [data.chatId + ".date"]: serverTimestamp(),
    // });
    const msgid = v4()
    const db = getDatabase();
    selectedUser?.id &&
      set(ref(db, 'supportChat/messages/' + selectedUser?.id + '/'), [null, selectedUserMessage?.length > 0 ? {
        ...selectedUserMessage[1],
        [msgid]: {
          message: text,
          messageId: msgid,
          messageTime: new Date().getTime(),
          messageType: '2',
          senderName: 'Admin',
          userImage: ''
        }
      } : {
        [msgid]: {
          message: text,
          messageId: msgid,
          messageTime: new Date().getTime(),
          messageType: '2',
          senderName: 'Admin',
          userImage: ''
        }
      }]).then((res) => {
        console.log("api res", res);
        setCallMessageApiAgain(!callMessageApiAgain)
      }).catch((err) => { console.log("error", err); })



    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
