import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import mick1 from '../img/mick1.png'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message?.senderName === 'Admin' && "owner"}`}
    >
      <div className="messageInfo">
        <img
          style={{ width: '20px', height: '20px' }}
          src={
            message?.senderName == 'Admin'
              ? mick1
              : message?.userImage
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message?.message}</p>
        {message?.userImage && <img src={message?.userImage} alt="" />}
      </div>
    </div>
  );
};

export default Message;
