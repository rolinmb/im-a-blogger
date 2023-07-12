import React, { Component } from "react";

export class Post extends Component{
  render(){
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