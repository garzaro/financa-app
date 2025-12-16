import React from 'react';

function Card({title, children}) {
  return (
    <div className="card text-white" style={{ marginTop: '-60px', backgroundColor: 'rgba(141,149,158,0.61)' }}>
      <h3 className="mt-2 text-center text-black">{title}</h3>
      <div className="card-body ">
        {children}
      </div>
    </div>
  )
}
export default Card;