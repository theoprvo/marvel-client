import "./character-favorite.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CharacterFavorite = ({ id, token }) => {
  const [data, setData] = useState({});
  const [dataFavorite, setDataFavorite] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //DATA OF CHARACTER
      const response = await axios.get(`http://localhost:3000/character/${id}`);
      setData(response.data);
      //DATA OF FAVORITES OF USER
      const responseFavoriteCheck = await axios.get(
        `http://localhost:3000/favorite/check`,
        { params: { userToken: token, marvelId: id } }
      );
      setDataFavorite({ ...responseFavoriteCheck.data });
      setIsLoading(false);
    };
    fetchData();
  }, [id, token]);

  const removeFavorite = async () => {
    await axios.delete(
      `http://localhost:3000/favorite/${dataFavorite.favoriteId}`
    );
    setDataFavorite({ isFavorite: false });
    console.log(dataFavorite);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      {dataFavorite.isFavorite === true && (
        <div className="container-favorite">
          <Link
            to={`/character/${data._id}`}
            className="container-favorite-img"
          >
            <img
              className=""
              src={`${data.thumbnail.path}/standard_incredible.${data.thumbnail.extension}`}
              alt={`${data.name}-image`}
            />
          </Link>
          <div className="container-favorite-txt">
            <h3 className="item-txt">{data.name}</h3>
            <button
              onClick={async () => {
                await removeFavorite();
              }}
            >
              remove
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterFavorite;
