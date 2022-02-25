import React from 'react';

export default function CustomInput({
  component,
  handleChange,
  one,
  name,
  errors,
  label,
  defaultValue,
  divClassname,
  ...rest
}) {
  return (
    <div className={divClassname}>
      <label>{label}</label>
      <input
        className="inputbox"
        id={name}
        value={defaultValue ? defaultValue : one[name]}
        onChange={handleChange(name)}
        {...rest}
      />
      {errors && errors[name] && errors[name].trim() !== '' && (
        <div className="error">{errors[name]}</div>
      )}
    </div>
  );
}
