import React from 'react';

const UserProfile = ({ username }) => {
  fetch('/api/comment/e1')
    .then((res) => res.json())
    .then((data) => console.log(data));

  return <h1></h1>;
};

export default UserProfile;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'Max',
    },
  };
}
