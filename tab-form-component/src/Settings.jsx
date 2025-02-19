import React from "react";

const Settings = ({ data, setData }) => {
  const theme = data?.settings;
  console.log("theme is", theme);
  const changeHandler = (e, id) => {
    setData((prev) => ({ ...prev, [id]: e.target.value }));
  };
  return (
    <>
      <div>
        <label>
          <input
            type="radio"
            checked={theme === "dark"}
            name="settings"
            value="dark"
            onChange={(e) => changeHandler(e, "settings")}
          />
          Dark
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="light"
            checked={theme === "light"}
            name="settings"
            onChange={(e) => changeHandler(e, "settings")}
          />
          Light
        </label>
      </div>
    </>
  );
};

export default Settings;
