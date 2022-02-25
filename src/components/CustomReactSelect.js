import React from 'react';
import Select from 'react-select';
import options from '../utils/Location';

export default function CustomReactSelect({
  errors,
  label,
  name,
  one,
  handleChange,
  defaultValue,
}) {
  options.forEach((opt, index) => {
    options[index].value = opt.label;
  });
  console.log(one[name]);
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <Select
        defaultValue={defaultValue || one[name]}
        value={options.filter(option => option.value === one[name])}
        options={options}
        name={name}
        onChange={handleChange}
      />
      {errors && errors[name] && errors[name].trim() !== '' && (
        <div className="error">{errors[name]}</div>
      )}
    </div>
  );
}
