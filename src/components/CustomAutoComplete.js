import React, { useState } from "react";

import AsyncSelect from "react-select/async";
import request from "../utils/request";
import { apiBaseUrl } from "../../constant";

export default function CustomAutoComplete({ name, handleChange }) {
  const [value, setValue] = useState("");
  let loadOptions = [{}];

  const promiseOptions = async (inputValue) => {
    const token = await localStorage.getItem("token");
    // http://localhost:5050/api/client/client?&find_role_title=&find_client_title=xz&page=1
    const { data } = await request(
      apiBaseUrl +
        `/client/client?&find_role_title=&find_client_title=${inputValue}&page=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    loadOptions = data.map((client) => {
      return { ...client, label: client.client_title, value: client._id };
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
      <label>Search Client: "{value}"</label>
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
