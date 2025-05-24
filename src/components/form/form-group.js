import React from "react";

{/*addBreak = true* opcional = <br>*/}
function FormGroup({htmlFor, label, children, addBreak = false}){
    return (
        <div className="form-group text-success" style={{ marginTop: '5px' }}>
            <label htmlFor={htmlFor} className="text-success">{label}</label>
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

export default FormGroup;