import "./home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CharacterFavorite from "../../components/character-favorite/CharacterFavorite";
import ComicFavorite from "../../components/comic-favorite/ComicFavorite";
import { Link } from "react-router-dom";

const Home = ({ token }) => {
  const [dataUser, setDataUser] = useState({});
  const [dataFavorites, setDataFavorites] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const responseUser = await axios.get(
        `http://localhost:3000/user/${token}`
      );
      setDataUser(responseUser.data);
      const responseFavorites = await axios.get(
        `http://localhost:3000/favorites/${token}`
      );
      setDataFavorites(responseFavorites.data); //array with favorites

      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  if (token) {
    return isLoading ? (
      <div>chargement</div>
    ) : (
      <div>
        <div className="hero">
          <div className="hero-mask"></div>
          <h1>WELCOME {dataUser.account.username}</h1>
        </div>
        <div className="container">
          <div className="characters">
            <h2 className="section-title">Favorites Characters</h2>
            <div className="favorites">
              {dataFavorites.map((item) => {
                if (item.type === "character") {
                  return (
                    <CharacterFavorite
                      key={item._id}
                      id={item.marvelId}
                      token={token}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className="comics">
            <h2 className="section-title">Favorites Comics</h2>
            <div className="favorites">
              {dataFavorites.map((item) => {
                if (item.type === "comic") {
                  return (
                    <ComicFavorite
                      key={item._id}
                      id={item.marvelId}
                      token={token}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="hero">
        <div className="hero-mask"></div>
        <h1>WELCOME HERO</h1>
        <Link to="/signup">
          <button>JOIN US HERE</button>
        </Link>
      </div>
    );
  }
};

export default Home;
