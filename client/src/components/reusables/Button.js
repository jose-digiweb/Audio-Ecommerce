import React from 'react';

const Button = ({ styles, type, text, children, handleClick }) => {
  return (
    <div>
      <button onClick={handleClick} type={type} className={styles}>
        {text} &nbsp; {children}
      </button>
    </div>
  );
};

export default Button;
