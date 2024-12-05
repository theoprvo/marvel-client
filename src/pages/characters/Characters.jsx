import "./characters.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useEffect, useState } from "react";
import CharacterCard from "../../components/character-card/CharacterCard";

const Characters = () => {
  const [data, setData] = useState({ results: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [research, setResearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(25);

  const API_BASE_URL = "http://localhost:3000/characters";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/${currentLimit}/${
            (currentPage - 1) * currentLimit
          }/${research}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({ results: [] });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, currentLimit, research]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return isLoading ? (
    <div className="loader-spinner">
      <TailSpin color="red" radius={"8px"} />
    </div>
  ) : (
    <div className="">
      <div className="search">
        <input
          onChange={(event) => {
            setResearch(event.target.value);
            setCurrentPage(1);
          }}
          type="text"
          placeholder="SEARCH A CHARACTER"
        />
      </div>
      <section className="container">
        <h1 className="roboto-black">CHARACTERS</h1>
        <div className="controls">
          {currentPage > 1 && (
            <button onClick={handlePreviousPage}>&lt;</button>
          )}
          <p>{currentPage}</p>
          <button onClick={handleNextPage}>&gt;</button>
          <select
            value={currentLimit}
            onChange={(event) => setCurrentLimit(Number(event.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="items-container">
          {data.results.map((item) => (
            <CharacterCard
              key={item._id}
              _id={item._id}
              name={item.name}
              img_url={item.thumbnail.path}
              img_extension={item.thumbnail.extension}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Characters;
