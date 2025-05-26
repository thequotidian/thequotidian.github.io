import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './PostView.css';

export interface PostViewProps {
  postIndex: number;
  onPostIndexChanged: (newIndex: number) => void;
  maxPostIndex: number;
}

function PostView({ postIndex, onPostIndexChanged, maxPostIndex }: PostViewProps) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const importPost = async () => {
      try {
        const postMeta = await import(`../../../posts/${postIndex}.json`);
        setPost(postMeta);
      } catch (e) {
        console.error("Error loading post:", e);
        setPost(null);
      }
    };
    importPost();
  }, [postIndex]);

  return post ? (
    <div class="post">
      <div class="postHeader">
        <IconButton aria-label="Back one post" disabled={postIndex === maxPostIndex} size="large">
          <ArrowBackIcon onClick={() => onPostIndexChanged(postIndex + 1)} />
        </IconButton>
        <div class="postTitle">{`${postIndex} - ${post.title}`}</div>
        <IconButton aria-label="Forward one post" disabled={postIndex === 0} size="large">
          <ArrowForwardIcon onClick={() => onPostIndexChanged(postIndex - 1)} />
        </IconButton>
      </div>
      {post.image && <img class="postImage" src={`../../../post-images/${post.image}`}/>}
      {post.link && <a class="postLink" href={post.link}>{post.link}</a>}
      <div class="postBody">{post.body.map((p, index) => (<p key={index}>{p}</p>))}</div>
    </div>
  ) : <div class="post">Whoops, something's gone wrong...</div>;
}

export default PostView;
