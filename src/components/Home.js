import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, createNewPost, logOut } from "../fbase";
import Post from "./Post";

const Home = () => {
  const [user, loading, /* error */ ] = useAuthState(auth);
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return; // render page loading content here
    }
    if (!user) { // if not logged in; re-direct client request to login page
      navigate("/login");
    }
  }, [user, loading]);

  return (
    <div className="home-page">
      <div className="home__container">
        <h3>You Are Logged In!</h3>
        <div className="create__post">
          <h4>Create a new post:</h4>
          <input
            type="text"
            className="submit__post"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Enter your new post here"
          />
          <button
            className="create_post__btn"
            onClick={() => {
              createNewPost(postText);
              alert("successfully created new post in Firestore db!");
              // and refresh <Posts /> with new content when it finishes updating the Firestore db
            }}
          >Create Post</button>
        </div>
        <h4>Posts Rendered Here!</h4>
        <div className="posts__container">
          <ul className="posts__list">
            <li className="post"><Post content="Blog Post 1" /></li>
            <li className="post"><Post content="Blog Post 2" /></li>
            <li className="post"><Post content="Blog Post 3" /></li>
            <li className="post"><Post content="Blog Post 4" /></li>
            <li className="post"><Post content="Blog Post 5" /></li>
          </ul>
      </div>
      </div>
      <div>
        <button className="logout__btn" onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Home;