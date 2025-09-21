import { useRef, useState, useEffect } from 'react';

const ScrollableText = ({ 
  children, 
  height = '96px',
  className = '',
}) => {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
        <div className="pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScrollableText;