import React, { useState } from "react";

function Form() {
  const [value, setValue] = useState("male");

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <form>
      <div>
        <label>
          Male:
          <input
            type="radio"
            name="gender"
            value="male"
            checked={value === "male"}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Female:
          <input
            type="radio"
            name="gender"
            value="female"
            checked={value === "female"}
            onChange={handleChange}
          />
        </label>
      </div>
    </form>
  );
}

export default Form;
