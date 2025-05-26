import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './PostView.css';

export interface PostViewProps {
  postIndex: number;
  onPostIndexChanged: (newIndex: number) => void;
  maxPostIndex: number;
}

const mapBodyEntries = (entries: string[]): ReactElement[] => entries.map((p, index) => {
  if (p.startsWith("LINK")) {
    const [_, displayText, url] = p.split("|");
    return (<p key={index} style={{ textAlign: "center" }}>
      <a href={url} target="_blank" rel="noopener noreferrer">{displayText}</a>
    </p>);
  } else {
    return (<p key={index}>{p}</p>);
  }
});

function PostView({ postIndex, onPostIndexChanged, maxPostIndex }: PostViewProps) {
  const [post, setPost] = useState(null);
  const [postBody, setPostBody] = useState(null);
  const [postFootnotes, setPostFootnotes] = useState(null);

  useEffect(() => {
    const importPost = async () => {
      try {
        const postMeta = await import(`../../../posts/${postIndex}.json`);
        setPost(postMeta);
        setPostBody(mapBodyEntries(postMeta.body));
        setPostFootnotes(postMeta.footnotes ? mapBodyEntries(postMeta.footnotes) : null);
      } catch (e) {
        console.error("Error loading post:", e);
        setPost(null);
        setPostBody(null);
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
      <div class="postDate">{new Date(post.date).toDateString()}</div>
      {post.image && <img class="postImage" src={`../../../post-images/${post.image}`} alt="An image associated with the post's content"/>}
      {post.link && <a class="postLink" href={post.link} target="_blank" rel="noopener noreferrer">{post.link}</a>}
      <div class="postBody">{postBody}</div>
      <div class="postFootnotes">{postFootnotes}</div>
    </div>
  ) : <div class="post">Whoops, something's gone wrong...</div>;
}

export default PostView;
