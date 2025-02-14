import { useState } from "react";
import "./App.css";
import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";

function App() {
  const [data, setData] = useState({
    name: "Namrata Das",
    age: "27",
    email: "namratadas334@gamil.com",
    interests: ["coding", "cooking", "music"],
  });
  const [tabComponent, setTabComponent] = [
    [
      {
        name: "Profile",
        component: <Profile data={data} setData={setData} />,
      },
      {
        name: "Interests",
        component: <Interests />,
      },
      {
        name: "Settings",
        component: <Settings />,
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
    </>
  );
}

export default App;
