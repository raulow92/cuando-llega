import { nanoid } from "nanoid";
import { FaBus } from "react-icons/fa";
import PropTypes from "prop-types";

const BusStopInfo = ({ busStop, isLoading }) => {
  return (
    <section className="px-2 md:px-8 first:border-t border-neutral-300">
      <div className="text-sm flex justify-between pb-2 border-b border-neutral-300">
        <p>Recorrido</p>
        <p>Patente</p>
        <p>Tiempo</p>
        <p>Distancia</p>
      </div>
      {!isLoading && (
        <>
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
        </>
      )}
    </section>
  );
};

BusStopInfo.propTypes = {
  busStop: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default BusStopInfo;
