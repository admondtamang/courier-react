import React, { useState } from "react";

import AsyncSelect from "react-select/async";
import request from "utils/request";

export default function DestinationAutoComplete({
  name,
  handleChange,
  label,
  keyLabel,
  labelValue,
}) {
  const [value, setValue] = useState("");
  let loadOptions = [{}];

  const promiseOptions = async (inputValue) => {
    const token = await localStorage.getItem("token");
    // http://localhost:5050/api/client/client?&find_role_title=&find_client_title=xz&page=1
    const data = await request(`https://api.fake-rest.refine.dev/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log(data);
    loadOptions = data.map((client) => {
      return { ...client, label: client[keyLabel], value: client[labelValue] };
    });

    return loadOptions;
  };

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    // console.log(inputValue);
    setValue(inputValue);
    return inputValue;
  };

  return (
    <div className="pb-2">
      <label>
        Search {label}: "{value}"
      </label>
      <AsyncSelect
        cacheOptions
        // onChange={getOption}
        name={name}
        // getOptionValue={() => getOption}
        onChange={handleChange}
        // loadedInputValue={}
        loadOptions={promiseOptions}
        defaultOptions
        onInputChange={handleInputChange}
      />
    </div>
  );
}
