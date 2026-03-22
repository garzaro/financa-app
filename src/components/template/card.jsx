import React from 'react';

function Card({title, children, className = ""}) {
  return (
    <div className={` justify-center items-center text-zinc-300 border border-primary shadow-lg
     ${className}`}
         style={{backgroundColor: 'rgb(25,23,23)' }}
    >
    <div className="justify-center bg-zinc-900 items-center text-zinc-300 "
    >
      <h3 className="mt-2 text-center"
          style={{ fontSize: '24px', letterSpacing: '2px' }}>
        { title }
      </h3>
      <div className="py-4 mt-2 mb-2  w-full mx-auto"
           style={{ fontSize: '14px', letterSpacing: '2px' }}
      >
        {children}
      </div>
    </div></div>
  )
}
export default Card;