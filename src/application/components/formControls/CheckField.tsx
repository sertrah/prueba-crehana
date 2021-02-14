import React, { FunctionComponent } from "react";

type LoaderProps = {
    id?: string;
    label?: string;
    name?: string;
    onChange?: any;
    onBlur?: any;
    value?: any;
  };

const  HCheck: FunctionComponent<LoaderProps>  = ({ id, name, label,onChange , value, onBlur, ...otherProps }) => {
  return (

        <input
          id={id || name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={label}
          className="c-input"
          {...otherProps}
        />

  );
}

export default HCheck;
