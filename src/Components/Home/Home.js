import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import "./style.scss";

import { auth, db, logout } from "./../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) return fetchUserName();
  }, [user, loading]);

  return (
    <div className="Home">
      <h1 className="name">
        Simpl1f1ed<span style={{ color: "#c1678b" }}>_</span>
      </h1>
      <p className="description">
        Front and Back End Developer • Applications and Graphics Hobbiest •
        Intelligence Enthusiast
      </p>
    </div>
  );
}
export default Home;
