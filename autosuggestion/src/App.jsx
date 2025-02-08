import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const inputRef = useRef();
  const suggestionRef = useRef();
  const debounceTimer = useRef(null); // Store timeout reference for debouncing

  const fetchSuggestions = async (inputValue) => {
    if (inputValue === "") {
      setSuggestionList([]);
      return;
    }
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${inputValue}`
    );
    const result = await response.json();
    setSuggestionList((suggestionList) => [
      ...suggestionList,
      result.recipes[0]?.name,
    ]);
    // console.log(result.recipes[0]?.name);
  };

  useEffect(() => {
    console.log("suggestion list", suggestionList);
  }, [suggestionList]);
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current); // Cancel previous timer
    }

    debounceTimer.current = setTimeout(() => {
      if (inputValue.trim() === "") {
        setSuggestionList([]);
      } else {
        fetchSuggestions(inputValue);
      }
    }, 200); // 300ms delay

    return () => clearTimeout(debounceTimer.current); // Cleanup on unmount
  }, [inputValue]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== inputRef.current && e.target !== suggestionRef.current)
        setShowSuggestion(false);
    });
    return () => {
      window.removeEventListener("click", () => {});
    };
  }, []);
  const eventHandler = (e) => {
    if (e.target.className === "suggestion") {
      console.log(e.target.innerText);
      setInputValue(e.target.innerText);
      setSuggestionList([]);
    }
  };
  return (
    <>
      <h3>What do you want to search today?</h3>
      <div onClick={(e) => eventHandler(e)}>
        <input
          type="text"
          className="inputbox"
          placeholder="Enter search item..."
          value={inputValue}
          ref={inputRef}
          onFocus={() => setShowSuggestion(true)}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {showSuggestion && (
          <div className="sugestionBox">
            {suggestionList?.length > 0
              ? suggestionList?.map((suggestionList) => (
                  <>
                    <div className="suggestion" ref={suggestionRef}>
                      {suggestionList}
                    </div>
                  </>
                ))
              : null}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
