import React, { Component } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../fbase";

export class Post extends Component{
  render(){
    // const [user, loading, /*error*/ ] = useAuthState(auth);
    return (
      <div className="post">
        <div className="post__container">
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}

export default Post;