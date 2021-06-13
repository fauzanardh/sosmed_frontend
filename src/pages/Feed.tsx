import React from "react"
import { Helmet } from 'react-helmet';
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import "./Feed.css";

const Feed = (props: any) => {
  return (
    
    <div className="feed">
      <div className="feed_header">
        <h2>Feed</h2>
      </div>

      <AddPost />

        {/* {posts.map((post) => (
          <Post
            key={post.text}
            displayName={post.displayName}
            username={post.username}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))} */}
        
    </div>
  );
}

export default Feed;