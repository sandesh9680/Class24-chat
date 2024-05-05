import React, { useState } from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = ({ selectedUser, setSelectedUserState }) => {
  return (
    <div className="sidebar" style={{ overflowY: 'scroll' }}>
      <Navbar setSelectedUserState={setSelectedUserState} />
      <Search setSelectedUserState={setSelectedUserState} />
      <Chats selectedUser={selectedUser} />
    </div>
  );
};

export default Sidebar;
