import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
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
import { db, dbreal } from "./firebase";
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());


function App() {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [newData, setNewData] = useState();

  useEffect(() => {
    get(child(dbRef, `supportChat/admin`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        localStorage.setItem('adminData', JSON.stringify(snapshot.val()[1]))
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }, [])


  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <>
      <div>hello world</div>
      <Home />
    </>
  );
}

export default App;
