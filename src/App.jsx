import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
// PAGES
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/login";
import Characters from "./pages/characters/Characters";
import CharacterDetails from "./pages/character-details/CharacterDetails";
import Comics from "./pages/comics/Comics";
import ComicDetails from "./pages/comic-details/ComicDetails";
// COMPONENTS
import Header from "./components/header/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header setUser={setUser} token={token} />
      <Routes>
        <Route path="/" element={<Home setUser={setUser} token={token} />} />
        <Route path="/characters/" element={<Characters />} />
        <Route
          path="/character/:id"
          element={<CharacterDetails token={token} />}
        />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:id" element={<ComicDetails token={token} />} />
        <Route
          path="/signup"
          element={<Signup setUser={setUser} token={token} />}
        />
        <Route
          path="/login"
          element={<Login setUser={setUser} token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
