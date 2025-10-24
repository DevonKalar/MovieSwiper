import React from 'react';

const Tag = ({ text, onClick }) => {
  return (
    <span onClick={onClick} className="tag">
      {text}
    </span>
  );
};

export default Tag;