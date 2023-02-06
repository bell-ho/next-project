import React, { Children, useRef, useState } from 'react';
import { extractFeedback, buildFeedbackPath } from '@/pages/api/feedback';
const Signup = (props) => {
  const [feedback, setFeedback] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  // const loadFeedbackHandler = () => {
  //   fetch('/api/feedback')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFeedback(data.feedback);
  //     });
  // };

  const loadFeedbackHandler = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedback(data.feedback);
      });
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id={'email'} ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea name="" id="feedback" cols="30" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      {/*<button onClick={loadFeedbackHandler}>Load Feedback</button>*/}
      <ul>
        {Children.toArray(
          props.feedback.map((item) => (
            <li>
              {item.email}
              {'  '}
              <button onClick={() => loadFeedbackHandler(item.id)}>Show Details</button>
            </li>
          )),
        )}
      </ul>
      {feedback && <p>{feedback.feedback}</p>}
    </div>
  );
};

export async function getStaticProps(context) {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedback: data,
    },
  };
}

export default Signup;
