import "./character-details.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComicsRelated from "../../components/comics-related/ComicsRelated";

const CharacterDetails = ({ token }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataFavorite, setDataFavorite] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //DATA OF CHARACTER
      const response = await axios.get(`http://localhost:3000/comics/${id}`);
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
      type: "character",
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
              <h1>{data.name}</h1>
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

        <section className="appearance-section">
          <h2>Appear in</h2>
          <div className="appearance-detail">
            {data.comics.map((item, index) => {
              return (
                <ComicsRelated
                  key={index}
                  name={item.title}
                  img_url={item.thumbnail.path}
                  img_extension={item.thumbnail.extension}
                />
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CharacterDetails;
