<<<<<<< HEAD
import React from "react";
import styled from "styled-components";
{/*addBreak = true* opcional = <br>*/}
function FormGroup({htmlFor, label, children, addBreak = false}){
    return (
        <div className="form-group text-success">
            <label htmlFor={htmlFor}>{label}</label>
            {children}
            {addBreak && <br/>}
        </div>
    );
}
/*
FormGroup.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    addBreak: PropTypes.bool,
};*/
=======
import React from 'react';

function FormGroup({htmlFor, label, children}) {
    return (
        <>
            <div className="form-group" >
                <label htmlFor={htmlFor} className="text-success" style={{ marginTop: '-15px' }}>
                    <br/>
                    {label}
                </label>
                {children}
            </div>
        </>
    );
}
>>>>>>> d492dfb (continuação)
export default FormGroup;