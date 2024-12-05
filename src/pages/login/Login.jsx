import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Audio as Loader } from "react-loader-spinner";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setIsLoading(true);
      //
      const response = await axios.post(`http://localhost:3000/user/login/`, {
        email: email,
        password: password,
      });
      if (response.data.token) {
        setUser(response.data.token);
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
      console.log();
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Wrong password/email");
        setIsLoading(false);
      }
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="auth-background">
        <div className="exit">
          <Link to="/">X</Link>
        </div>
        <div className="sign-up">
          <h1>Sign in</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="d-flex-col">
              <label htmlFor="">EMAIL</label>
              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrorMessage("");
                }}
                value={email}
                name="email"
                type="mail"
                placeholder="EMAIL"
              />
            </div>
            <div className="d-flex-col">
              <label htmlFor="">PASSWORD</label>
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
                name="password"
                type="password"
                placeholder="PASSWORD"
              />
            </div>

            <span className="">{errorMessage}</span>
            {isLoading ? (
              <Loader color="#2CB1BA" height={40} width={40} />
            ) : (
              <div className="form-end">
                <button type="submit">Log in</button>
                <Link to="/signup">CREATE ACCOUNT</Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
