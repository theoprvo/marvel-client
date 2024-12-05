import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./header.css";

const Header = ({ token, setUser }) => {
  const [dataUser, setDataUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const responseUser = await axios.get(
          `http://localhost:3000/user/${token}`
        );
        setDataUser(responseUser.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return isLoading ? (
    <div>chargement</div>
  ) : (
    <>
      <header>
        <nav>
          <ul>
            <li className="padding">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dwe3psc5x/image/upload/v1733135119/marvel-logo_okjesb.svg"
                  alt=""
                />
              </Link>
            </li>
            <li className="padding link-menu">
              <Link to="/characters">
                <div className="roboto-medium">CHARACTERS</div>
              </Link>
            </li>
            <li className="padding link-menu">
              <Link to="/comics">
                <div className="roboto-medium">COMICS</div>
              </Link>
            </li>

            {/* {console.log(dataUser)} */}

            {dataUser && dataUser.account ? (
              <li className="padding signout">
                <div className="roboto-medium">{dataUser.account.username}</div>
                <button
                  className="roboto-medium"
                  onClick={() => {
                    setUser(null);
                  }}
                >
                  SIGN OUT
                </button>
              </li>
            ) : (
              <li className="login">
                <Link to="/signup">
                  <div className="roboto-medium">JOIN</div>
                </Link>
                <div className="separator">|</div>
                <Link to="/login">
                  <div className="roboto-medium">LOGIN</div>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
