import React from 'react';

const Button = ({ styles, type, text, children, handleClick }) => {
  return (
    <div>
      {children ? (
        <button onClick={handleClick} type={type} className={styles}>
          {text} &nbsp; {children}
        </button>
      ) : (
        <button onClick={handleClick} type={type} className={styles}>
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
