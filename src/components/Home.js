import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logOut } from "../fbase";
import Posts from "./Posts";

const Home = () => {
  const [user, loading, /* error */ ] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) { // if not logged in; re-direct client request to login page
      navigate("/login");
    }
  }, [user, loading]);

  return (
    <div className="home-page">
      <div className="home__container">
        <h3>You Are Logged In!</h3>
        <Posts />
      </div>
      <div>
        <button className="logout__btn" onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Home;