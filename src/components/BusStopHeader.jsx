import { FaStar } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import PropTypes from "prop-types";

const BusStopHeader = ({ isLoading, error, busStop, onFavoriteClick}) => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <div className="flex items-center justify-between bg-neutral-200 my-6 px-6 md:px-8 h-28 rounded-xl">
      {isLoading ? (
        <div className="flex justify-center w-full gap-2">
          <FiLoader className="animate-spin text-[#CF152D] text-5xl" />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : Object.keys(busStop).length === 0 ? null : (
        <>
          <div className="flex items-center gap-6">
            <p className="bg-neutral-500 text-white font-medium py-1 px-3 rounded-full">
              {busStop.id}
            </p>
            <h2 className="md:text-xl">{busStop.name}</h2>
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
  );
};

BusStopHeader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  busStop: PropTypes.object.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
};

export default BusStopHeader;
