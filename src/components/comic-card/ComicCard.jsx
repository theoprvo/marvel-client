import "./comic-card.css";
import { Link } from "react-router-dom";

const ComicCard = (props) => {
  return (
    <>
      <div className="container-item-card hover-effect-character-card">
        <Link to={`/comic/${props._id}`} className="character-card">
          <div>
            <img
              className="item-img"
              src={`${props.img_url}/portrait_incredible.${props.img_extension}`}
              alt={`${props.name}-image`}
            />
          </div>
          <div className="item-txt">{props.name}</div>
        </Link>
      </div>
    </>
  );
};

export default ComicCard;
