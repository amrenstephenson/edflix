import React, { useState } from 'react';

function IconButton(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClicked(false);
      }}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      style={{
        background: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        opacity: isClicked ? 0.3 : (isHovered ? 0.5 : 1),
        ...props.style
      }}
    >
      {props.children}
    </button>
  );
}

export default IconButton;