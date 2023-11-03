import { useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Favorites from "./components/Favorites";
import BusStopHeader from "./components/BusStopHeader";
import BusStopInfo from "./components/BusStopInfo";
import fetchData from "./utils/api";
import getFavoritesFromLocalStorage from "./utils/localStorage";
import { FavoriteContext } from "./context/FavoriteContext";

const App = () => {
  const API_BASE_URL = "https://api.xor.cl/red/bus-stop/";
  const [busStop, setBusStop] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
  const [showFavorites, setShowFavorites] = useState(false);
  const inputRef = useRef();

  const onFormSubmit = (e) => {
    e.preventDefault();
    const URL = API_BASE_URL + inputValue;
    fetchData(URL, setBusStop, setError, setIsLoading);
    inputRef.current.value = "";
  };

  const onFavoriteClick = () => {
    if (favorites.includes(busStop.id)) {
      const updatedFavorites = favorites.filter((id) => id !== busStop.id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, busStop.id];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const onShowFavoritesClick = () => {
    setShowFavorites(!showFavorites);
  };

  const onFavoriteTagClick = (id) => {
    const URL = API_BASE_URL + id;
    fetchData(URL, setBusStop, setError, setIsLoading);
    inputRef.current.value = "";
  };

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      <div className="container mx-auto min-h-screen p-4 md:p-8">
        <Header
          setInputValue={setInputValue}
          onFormSubmit={onFormSubmit}
          onShowFavoritesClick={onShowFavoritesClick}
          showFavorites={showFavorites}
          inputRef={inputRef}
        />
        {showFavorites && <Favorites onFavoriteTagClick={onFavoriteTagClick} />}
        <BusStopHeader
          isLoading={isLoading}
          error={error}
          busStop={busStop}
          onFavoriteClick={onFavoriteClick}
        />
        <BusStopInfo busStop={busStop} isLoading={isLoading} />
      </div>
    </FavoriteContext.Provider>
  );
};
export default App;
