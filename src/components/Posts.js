import React, { Component } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../fbase";
import Post from "./Post";

export class Posts extends Component{
  render(){
    // const [user, loading, /*error*/ ] = useAuthState(auth);
    
    return (
    <div className="posts">
      <div className="posts__container">
        <h4>Posts Rendered Here!</h4>
        <ul className="posts__list">
          <li className="post"><Post content="Blog Post 1" /></li>
          <li className="post"><Post content="Blog Post 2" /></li>
          <li className="post"><Post content="Blog Post 3" /></li>
          <li className="post"><Post content="Blog Post 4" /></li>
          <li className="post"><Post content="Blog Post 5" /></li>
        </ul>
      </div>
    </div>
    );
  }
}

export default Posts;