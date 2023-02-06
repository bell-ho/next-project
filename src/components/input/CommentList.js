import classes from './comment-list.module.css';
import { Children } from 'react';

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {Children.toArray(
        comments.map((comment) => (
          <li>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        )),
      )}
    </ul>
  );
}

export default CommentList;
