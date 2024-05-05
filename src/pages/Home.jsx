import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  const [selectedUser, setSelectedUserState] = useState()
  return (
    <div className='home'>
      <div className="container">
        <Sidebar selectedUser={selectedUser} setSelectedUserState={setSelectedUserState} />
        <Chat selectedUser={selectedUser} />
      </div>
    </div>
  )
}

export default Home