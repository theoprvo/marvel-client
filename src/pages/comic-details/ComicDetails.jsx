import "./comic-details.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ComicDetails = ({ token }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataFavorite, setDataFavorite] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //DATA OF CHARACTER
      const response = await axios.get(`http://localhost:3000/comic/${id}`);
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

  const addFavorite = async () => {
    const response = await axios.post(`http://localhost:3000/favorite`, {
      token: token,
      type: "comic",
      marvelId: id,
    });
    setDataFavorite({ isFavorite: true, favoriteId: response.data._id });
    console.log(dataFavorite);
  };
  const removeFavorite = async () => {
    await axios.delete(
      `http://localhost:3000/favorite/${dataFavorite.favoriteId}`
    );
    setDataFavorite({ isFavorite: false });
    console.log(dataFavorite);
  };

  return isLoading ? (
    <>2sec</>
  ) : (
    <>
      {console.log(data, dataFavorite)}
      <div className="container">
        <section className="page-detail">
          <div className="page-detail-image-container">
            <img
              src={`${data.thumbnail.path}/portrait_incredible.${data.thumbnail.extension}`}
              alt={`${data.name}-img`}
            />
          </div>
          <div className="page-detail-text-container">
            <div className="headline">
              <h1>{data.title}</h1>
              {token && (
                <div>
                  {dataFavorite.isFavorite === false ? (
                    <button
                      onClick={async () => {
                        await addFavorite();
                      }}
                    >
                      Add to favorites
                    </button>
                  ) : (
                    <button
                      onClick={async () => {
                        await removeFavorite();
                      }}
                    >
                      Remove from favorites
                    </button>
                  )}
                </div>
              )}
            </div>
            {data.description ? (
              <p>{data.description}</p>
            ) : (
              <p>No description</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ComicDetails;
