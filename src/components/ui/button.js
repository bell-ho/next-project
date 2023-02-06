import React from 'react';
import Link from 'next/link';
import classes from './button.module.css';

const Button = ({ children, link, onClick }) => {
  if (link) {
    return (
      <Link className={classes.btn} href={link}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
