import React from 'react';

/*encapsula o formulario de login*/
function Card({title, children}) {
    return (
        <div className="card card-custom mb-3 text-white" style={{ marginTop: '-110px', backgroundColor: 'rgba(50,108,166,0.61)' }}>
            <h3 className="card-header text-center">{title}</h3>
            <div className="card-body ">
                {children}
            </div>
        </div>
    )
}
export default Card;