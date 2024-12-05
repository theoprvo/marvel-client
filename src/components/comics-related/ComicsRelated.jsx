import "./comics-related.css";
import { Link } from "react-router-dom";

const ComicsRelated = (props) => {
  return (
    <>
      <div className="container-item-card">
        <Link to="/" className="character-card comics-related-hover">
          <div>
            <img
              className="item-img"
              src={`${props.img_url}/portrait_incredible.${props.img_extension}`}
              alt=""
            />
          </div>
          <div>{props.name}</div>
        </Link>
      </div>
    </>
  );
};

export default ComicsRelated;
