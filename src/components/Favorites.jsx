import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

const Favorites = ({onFavoriteTagClick}) => {
  const { favorites } = useContext(FavoriteContext);
  return (
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
  );
};

Favorites.propTypes = {
  onFavoriteTagClick: PropTypes.func.isRequired,
};

export default Favorites;
