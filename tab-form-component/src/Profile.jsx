import React from "react";

const Profile = ({ data, setData }) => {
  const { name, age, email, interests } = data;
  const changeHandler = (e, id) => {
    setData((prev) => ({ ...prev, [id]: e.target.value }));
  };
  return (
    <div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => changeHandler(e, "name")}
          id={name}
        />
      </div>
      <div>
        <label>Age:</label>
        <input type="text" value={age} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={email} />
      </div>
    </div>
  );
};

export default Profile;
