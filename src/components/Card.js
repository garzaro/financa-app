import React from 'react';
/*encapsula o fomulario*/
const Card = ({ children }) => {
    return (
        <div className="card">
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};
export default Card;