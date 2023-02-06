import { useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetch(`/api/comment/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log();
        setComments(data.comments);
        setShowComments(true);
      });
  }, [eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const reqBody = {
      ...commentData,
      eventId,
    };

    fetch(`/api/comment/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
