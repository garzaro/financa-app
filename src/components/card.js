import React from 'react';
/*encapsula o formulario de login*/
function Card({title, children}) {
    return (
        <div className="card card-custom mb-3 mt-4 text-success" style={{ marginTop: '-55px' }}>
            <h3 className="card-header text-center">{title}</h3>
            <div className="card-body ">
                {children}
            </div>
        </div>
    )
}
export default Card;