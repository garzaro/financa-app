import React from "react";

function FormGroup({htmlFor, label, children, addBreak = false}){
  return (
    <div className="form-group mt-0 mb-0 text-danger" style={{ marginTop: '5px' }}>
      <label htmlFor={htmlFor} className="text-white">{label}</label>
      {children}
      {addBreak && <br/>}
    </div>
  );
}
export default FormGroup;