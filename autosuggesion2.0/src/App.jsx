import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [fetchedResult, setFetchedResult] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  let timeRef = useRef();
  let inputRef = useRef(null);
  let resultsRef = useRef(null);
  const fetchData = async (inputValue) => {
    if (cache[inputValue]) {
      console.log("FROM CACHE", cache[inputValue], inputValue);
      setFetchedResult(cache[inputValue]);
      return;
    }
    console.log("API CALLED", inputValue);
    const result = await fetch(
      `https://dummyjson.com/recipes/search?q=${inputValue}`
    );
    const response = await result.json();

    setFetchedResult(response?.recipes);
    setCache((prev) => ({ ...prev, [inputValue]: response?.recipes }));
  };

  useEffect(() => {
    console.log("fetched result", fetchedResult);
  }, [fetchedResult]);
  useEffect(() => {
    if (timeRef.current) clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      fetchData(inputValue);
    }, 300);
    return () => clearTimeout(timeRef.current);
  }, [inputValue]);

  useEffect(() => {
    let ev;
    ev = window.addEventListener("click", (e) => {
      if (e.target !== inputRef.current && e.target !== resultsRef.current)
        setShowResults(false);
    });

    return () => removeEventListener(ev, () => {});
  }, []);
  return (
    <>
      <div className="flex">
        <h1>Autocomplete Search Bar</h1>
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowResults(true)}
          // onBlur={() => setShowResults(false)}
          ref={inputRef}
        />
        {showResults ? (
          <div className="results-container">
            {fetchedResult?.length &&
              fetchedResult?.map((fetchedResult) => {
                return (
                  <div
                    key={fetchedResult?.name}
                    className="fetchedesult"
                    onClick={() => setInputValue(fetchedResult?.name)}
                    ref={resultsRef}
                  >
                    {fetchedResult?.name}
                  </div>
                );
              })}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
