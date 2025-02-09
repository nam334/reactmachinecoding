import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
const ITEMS_PER_PAGE = 10;
function App() {
  const [fetchedResult, setFetchedResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const fetchData = async () => {
    const result = await fetch(`https://dummyjson.com/products?limit=500`);
    const response = await result.json();
    setFetchedResult(response?.products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const totalItems = fetchedResult?.length;

  const start = currentPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    console.log(
      "start",
      start,
      "end",
      end,
      "fetchedResult",
      fetchedResult?.slice(start, end)
    );
  }, [start, end, fetchedResult]);

  const pageNumberHandler = (index) => {
    setCurrentPage(index);
  };

  const prevPageHandler = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };
  const nextPageHandler = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  return (
    <>
      <h4>Pagination in React</h4>
      <button
        className="page-button"
        disabled={currentPage === 0}
        onClick={prevPageHandler}
      >
        ◀
      </button>
      {[...Array(totalPages).keys()]?.map((item, index) => (
        <button
          key={index}
          className={
            currentPage === index ? "active page-button" : "page-button"
          }
          onClick={() => pageNumberHandler(item)}
        >
          {item + 1}
        </button>
      ))}
      <button
        className="page-button"
        onClick={nextPageHandler}
        disabled={currentPage === totalItems?.length - 1}
      >
        ▶
      </button>
      <div className="product-container">
        {fetchedResult?.length
          ? fetchedResult?.slice(start, end)?.map((fetchedResult) => (
              <div key={fetchedResult?.brand} className="product-card">
                <img
                  src={fetchedResult?.images}
                  alt="product image"
                  className="product-image"
                />
                <h5>{fetchedResult?.title}</h5>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default App;
