import React from "react";

const Interests = ({ data, setData, error, setError }) => {
  const { interests } = data;
  const changeHandler = (e) => {
    // setData(prev => {...prev, })
    setData((prev) => ({
      ...prev,
      interests: e.target.checked
        ? [...prev.interests, e.target.name]
        : prev.interests.filter((i) => i !== e.target.name),
    }));
  };
  console.log(interests);
  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interests?.includes("coding")}
            onChange={changeHandler}
          />
          Coding
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="cooking"
            checked={interests?.includes("cooking")}
            onChange={changeHandler}
          />
          Cooking
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="travelling"
            checked={interests?.includes("travelling")}
            onChange={changeHandler}
          />
          Travelling
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={interests?.includes("music")}
            onChange={changeHandler}
          />
          Music
        </label>
      </div>
      <div className="error">{error?.interests}</div>
    </div>
  );
};

export default Interests;
