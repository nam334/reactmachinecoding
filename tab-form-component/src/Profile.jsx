import React from "react";

const Profile = ({ data, setData, error }) => {
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
        <div className="error">{error?.name}</div>
      </div>
      <div>
        <label>Age:</label>
        <input
          type="text"
          value={age}
          onChange={(e) => changeHandler(e, "age")}
        />
        <div className="error">{error?.age}</div>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => changeHandler(e, "email")}
        />
        <div className="error">{error?.email}</div>
      </div>
    </div>
  );
};

export default Profile;
