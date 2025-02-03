import { useEffect, useState } from "react";
import "./App.css";
const ENDPOINT = "https://hacker-news.firebaseio.com/v0";
const ITEMS_PER_PAGE = 6;

function App() {
  const [message, setMessage] = useState("Hacker News Jobs Board");
  const [currPage, setCurrPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [items, setItems] = useState([]);

  const fetchData = async (currPage) => {
    currPage === 0 && setIsLoading(true);
    currPage > 0 && setIsLoadingMore(true);
    setCurrPage(currPage);
    const url = `${ENDPOINT}/jobstories.json`;
    const response = await fetch(url);
    const res = await response.json();
    console.log(res);

    const slicedData = res.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
    const result = await Promise.all(
      slicedData?.map((slicedData) =>
        fetch(`${ENDPOINT}/item/${slicedData}.json`).then((res) => res.json())
      )
    );
    console.log("result is", result);
    currPage === 0 && setIsLoading(false);
    currPage > 0 && setIsLoadingMore(false);
    setItems((items) => [...items, ...result]);
  };

  useEffect(() => {
    if (currPage === 0) fetchData(currPage);
  }, [currPage]);
  return (
    <>
      <p className="message">{message}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex">
            {items?.map((items, index) => {
              return (
                <div className="item_div" key={index}>
                  <p>{items?.title}</p>
                  <span>
                    By {items?.by} .{" "}
                    {new Date(items?.time * 1000).toLocaleString()}
                  </span>
                </div>
              );
            })}
            <button
              className="loadmoreBTn"
              onClick={() => fetchData(currPage + 1)}
            >
              {isLoadingMore ? (
                <span>Loading..</span>
              ) : (
                <span>Load more jobs</span>
              )}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
