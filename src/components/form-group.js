import React from "react";

import '../formulario.css'
function FormGroup(props) {

    return (
        <div className="form-group text-success">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
            <br/>
        </div>
    );
}
export default FormGroup;