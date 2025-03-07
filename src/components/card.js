import React from 'react';
/**/
function Card({title, children}) {
    return (
        <>
            <div className="card mb-3"  style={{ marginTop: '-55px' }}>
                <h3 className="card-header text-success">{title}</h3>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </>
    );
}
export default Card;