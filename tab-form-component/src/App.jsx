import { act, useState } from "react";
import "./App.css";
import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";

function App() {
  const [data, setData] = useState({
    name: "Namrata Das",
    age: "27",
    email: "namratadas334@gmail.com",
    interests: ["coding", "cooking", "music"],
    settings: "light",
  });
  const [error, setError] = useState("");
  const submitHandler = () => {
    console.log("resultant data is", data);
  };
  const [tabComponent, setTabComponent] = [
    [
      {
        name: "Profile",
        component: (
          <Profile
            data={data}
            setData={setData}
            error={error}
            setError={setError}
          />
        ),
        validate: function () {
          const err = {};
          if (!data.name || data.name.length < 2)
            err.name = "Name is not valid";
          if (!data.age || data.age < 18)
            err.age = "Ae should be greater than 18";
          if (!data.email || data.email.length < 2)
            err.email = "Email is not valid";
          console.log("email length is", data.email.length);
          console.log(
            "what the function returns",
            err.name || err.age || err.email
          );
          setError(err);
          return err.name || err.age || err.email ? false : true;
        },
      },
      {
        name: "Interests",
        component: (
          <Interests
            data={data}
            setData={setData}
            error={error}
            setError={setError}
          />
        ),
        validate: function () {
          const err = {};
          if (data?.interests?.length <= 0)
            err.interests = "Please select at least one interest";
          console.log("length is", data?.interests?.length);
          setError(err);
          return data.interests.length <= 0 ? false : true;
        },
      },
      {
        name: "Settings",
        component: (
          <Settings
            data={data}
            setData={setData}
            error={error}
            setError={setError}
          />
        ),
        validate: function () {
          return true;
        },
      },
    ],
  ];
  const [activeState, setActiveState] = useState(0);

  return (
    <>
      <h3>Tab Form Component</h3>
      <div className="tab-container">
        {tabComponent?.length > 0
          ? tabComponent?.map((tabComponent, index) => (
              <div
                key={index}
                className="tab-container-tabs"
                onClick={() => setActiveState(index)}
              >
                <span>{tabComponent?.name}</span>
              </div>
            ))
          : null}
      </div>
      <div className="tab-container-content">
        {tabComponent?.[activeState]?.component}
      </div>
      {activeState > 0 ? (
        <button
          onClick={() => setActiveState((activeState) => activeState - 1)}
        >
          Prev
        </button>
      ) : null}
      {activeState >= 0 && activeState < tabComponent?.length - 1 ? (
        <button
          onClick={() => {
            if (tabComponent?.[activeState]?.validate())
              setActiveState((activeState) => activeState + 1);
          }}
        >
          Next
        </button>
      ) : null}
      {activeState === tabComponent?.length - 1 ? (
        <button onClick={submitHandler}>Submit</button>
      ) : null}
    </>
  );
}

export default App;
