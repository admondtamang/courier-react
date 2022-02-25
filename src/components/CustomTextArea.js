import React from 'react';

export default function CustomTextArea({
  component,
  handleChange,
  one,
  name,
  errors,
  label,
  ...rest
}) {
  return (
    <div className="w-full md:w-1/2 pb-4">
      <label>{label}</label>
      <textarea
        className="inputbox"
        id={name}
        value={one[name]}
        onChange={handleChange(name)}
        {...rest}
      />
      {errors && errors[name] && errors[name].trim() !== '' && (
        <div className="error">{errors[name]}</div>
      )}
    </div>
  );
}
