import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { FaSearch, FaStar, FaBus } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import Logo from "./assets/logotipo.png";
import "./App.css";

function getFavoritesFromLocalStorage() {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
}

function App() {
  const API_BASE_URL = "https://api.xor.cl/red/bus-stop/";
  const [busStop, setBusStop] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
  const [showFavorites, setShowFavorites] = useState(false);
  const inputRef = useRef();

  const fetchData = (URL) => {
    setIsLoading(true);

    fetch(URL)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return await response.json();
      })
      .then((data) => {
        setBusStop(data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setBusStop([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const URL = API_BASE_URL + inputValue;
    fetchData(URL);
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
    fetchData(URL);
    inputRef.current.value = "";
  };

  return (
    <div className="container mx-auto min-h-screen p-8">
      <header className="flex justify-between items-center">
        <img src={Logo} alt="logo" className="hidden md:flex" />
        <form onSubmit={onFormSubmit} className="flex items-center">
          <FaSearch className="absolute pointer-events-none ml-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Ingresa el paradero"
            className="bg-neutral-50 border-neutral-300 border rounded-lg py-3 pl-12 mr-3 w-48 lg:w-96"
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
          <button
            className="bg-[#CF152D] text-neutral-50 rounded-lg py-3 px-5 hover:scale-105 transition-all ease-in-out"
            type="submit"
          >
            Buscar
          </button>
        </form>
        <button className="flex justify-end items-center hover:scale-105 transition-all ease-in-out w-44">
          <FaStar className="text-[#CF152D] text-xl mr-2" />
          <p onClick={onShowFavoritesClick} className="sm:text-md">
            {showFavorites ? "Ocultar Favoritos" : "Ver Favoritos"}
          </p>
        </button>
      </header>
      {showFavorites && (
        <div className="flex flex-wrap items-center mt-6 gap-2">
          <p className="font-bold text-lg">Favoritos:</p>
          {favorites.map((favorite) => {
            return (
              <button
                className="bg-neutral-500 text-white text-sm rounded-full px-2 py-1 hover:scale-105 transition-all ease-in-out"
                key={nanoid()}
                onClick={() => onFavoriteTagClick(favorite)}
              >
                {favorite}
              </button>
            );
          })}
        </div>
      )}
      <div className="flex items-center justify-between bg-neutral-200 my-6 px-8 h-28 rounded-xl">
        {isLoading ? (
          <div className="flex justify-center w-full gap-2">
            <FiLoader className="animate-spin text-[#CF152D] text-5xl" />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : busStop.length === 0 ? null : (
          <>
            <div className="flex items-center gap-6">
              <p className="bg-neutral-500 text-white font-medium py-1 px-3 rounded-full">
                {busStop.id}
              </p>
              <h2 className="text-xl">{busStop.name}</h2>
            </div>
            <FaStar
              onClick={onFavoriteClick}
              className={`${
                favorites.includes(busStop.id)
                  ? "text-[#CF152D] hover:text-[#CF152D]"
                  : "text-neutral-400 hover:text-[#CF152D]"
              } hover:cursor-pointer text-3xl mr-2 hover:scale-110 transition-all ease-in-out`}
            />
          </>
        )}
      </div>
      {!isLoading && (
        <section className="px-8 first:border-t border-neutral-300">
          <div className="text-sm flex justify-between pb-2 border-b border-neutral-300">
            <p>Recorrido</p>
            <p>Patente</p>
            <p>Tiempo</p>
            <p>Distancia</p>
          </div>
          {busStop.services?.map((service) => {
            return (
              <div key={nanoid()}>
                {service.valid ? (
                  <>
                    {service.buses.map((bus) => {
                      return (
                        <div
                          key={nanoid()}
                          className="flex justify-between items-center border-b border-neutral-300 py-2"
                        >
                          <div className="flex px-3 py-1 rounded-full items-center bg-black text-white">
                            <FaBus className="text-lg mr-2" />
                            <p className="font-medium">{service.id}</p>
                          </div>
                          <p>{bus.id}</p>
                          <p>
                            {bus.min_arrival_time} - {bus.max_arrival_time} min.
                          </p>
                          <p>{(bus.meters_distance / 1000).toFixed(1)} km</p>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="flex items-center border-b border-neutral-300 py-2">
                    <div className="flex px-3 py-1 rounded-full items-center bg-black text-white">
                      <FaBus className="text-lg mr-2" />
                      <p className="font-medium">{service.id}</p>
                    </div>
                    <p className="w-full text-center">
                      {service.status_description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
export default App;
