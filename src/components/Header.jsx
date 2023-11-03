import Logo from "../assets/logotipo.png";
import { FaSearch, FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

const Header = ({
  setInputValue,
  onFormSubmit,
  onShowFavoritesClick,
  showFavorites,
  inputRef,
}) => {
  return (
    <header className="flex justify-between items-center">
      <img src={Logo} alt="logo" className="hidden md:flex h-12" />
      <form onSubmit={onFormSubmit} className="flex items-center">
        <FaSearch className="absolute pointer-events-none ml-5 text-neutral-500" />
        <input
          type="text"
          placeholder="Ingresa el paradero"
          className="bg-neutral-50 border-neutral-300 border rounded-lg py-3 pl-12 mr-3 w-full lg:w-96"
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
      <button
        onClick={onShowFavoritesClick}
        className="flex justify-end items-center hover:scale-105 transition-all ease-in-out ml-2"
      >
        <FaStar className="text-[#CF152D] text-xl mr-2" />
        <p className="hidden sm:flex sm:text-md whitespace-nowrap">
          {showFavorites ? "Ocultar Favoritos" : "Ver Favoritos"}
        </p>
      </button>
    </header>
  );
};

Header.propTypes = {
  setInputValue: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onShowFavoritesClick: PropTypes.func.isRequired,
  showFavorites: PropTypes.bool.isRequired,
  inputRef: PropTypes.object.isRequired,
};

export default Header;
