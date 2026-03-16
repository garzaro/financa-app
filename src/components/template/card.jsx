import React from 'react';

function Card({title, children}) {
  return (
    <div className="card text-white  border border-primary shadow-lg "
         style={{backgroundColor: 'rgb(30,29,29)' }}>
      <h3 className="mt-2 text-center"
          style={{ fontSize: '18px', letterSpacing: '2px' }}>
        { title }
      </h3>
      <div className="p-4 py-2 mt-2 mb-2 "
           style={{ fontSize: '12px', letterSpacing: '2px' }}
      >
        {children}
      </div>
    </div>
  )
}
export default Card;