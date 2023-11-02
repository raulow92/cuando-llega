import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { FaSearch, FaStar, FaBus } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import Logo from "./assets/logotipo.png";

function App() {
    const API_BASE_URL = "https://api.xor.cl/red/bus-stop/";
    const [busStop, setBusStop] = useState([]);
    const [date, setDate] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(null);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const URL = API_BASE_URL + inputValue;

        fetch(URL)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener datos de la API");
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
            });
    };

    return (
        <div className="container mx-auto min-h-screen p-8">
            <header className="flex justify-between items-center">
                <img src={Logo} alt="logo" />
                <form
                    onSubmit={onFormSubmit}
                    className="flex items-center"
                >
                    <FaSearch className="absolute pointer-events-none ml-5 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Ingresa el paradero"
                        className="bg-neutral-50 border-neutral-300 border rounded-lg py-3 px-12 mr-3 w-96"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        className="bg-[#CF152D] text-neutral-50 rounded-lg py-3 px-5"
                        type="submit"
                    >
                        Buscar
                    </button>
                </form>
                <button className="flex items-center">
                    <FaStar className="text-[#CF152D] text-xl mr-2"/>
                    <p className="text-lg">Ver Favoritos</p>
                </button>
            </header>
            <div className="flex bg-slate-200 my-6 p-8 rounded-xl">
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div className="flex items-center gap-6">
                        <p className="bg-neutral-500 text-white font-medium py-2 px-3 rounded-full">{busStop.id}</p>
                        <h2 className="text-xl">{busStop.name}</h2>
                    </div>
                )}
            </div>
            <section className="px-8">
            {busStop.services?.map((service) => {
                return (
                    <div
                        key={nanoid()}
                        className=""
                    >
                        {service.valid ? (
                            <>
                                {service.buses.map((bus) => {
                                    return (
                                        <div
                                            key={nanoid()}
                                            className="flex border-b border-neutral-300"
                                        >
                                            <div className="flex px-3 py-2 rounded-full items-center bg-black text-white">
                                                <FaBus className="text-lg mr-2" />
                                                <p className="font-medium">{service.id}</p>
                                            </div>
                                            <p>{bus.id}</p>
                                            <p>
                                                {bus.min_arrival_time} -
                                                {bus.max_arrival_time} min.
                                            </p>
                                            <p>
                                                {(
                                                    bus.meters_distance / 1000
                                                ).toFixed(1)}{" "}
                                                km
                                            </p>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <div className="flex">
                                <p>{service.id}</p>
                                <p>{service.status_description}</p>
                            </div>
                        )}
                    </div>
                );
            })}
            </section>

        </div>
    );
}
export default App;
