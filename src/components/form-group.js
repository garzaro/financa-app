import React from "react";

function FormGroup(props) {

    return (
        <div className="form-group text-success">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}

        </div>
    );
}
export default FormGroup;