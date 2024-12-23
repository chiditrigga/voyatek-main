import React, { useState, useEffect, useRef } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../components/InputField";
import Button from "../components/Button";

interface FlightSearchProps {
  onClose: () => void;
}

interface Airline {
  name: string;
  logoUrl: string;
  iataCode: string;
  count: number;
  minPrice: {
    currencyCode: string;
    units: number;
    nanos: number;
  };
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onClose }) => {
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [departDate, setDepartDate] = useState<string>("");
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isButtonDisabled =
    !fromLocation || !toLocation || !departDate || loading;

  const api = import.meta.env.VITE_RAPIDAPI_KEY;

  const fetchLocationId = async (location: string): Promise<string | null> => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${location}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": api,
            "x-rapidapi-host": "booking-com15.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      return data.data?.[0]?.id || null;
    } catch (error) {
      setError(
        `Error fetching destination ID - You have exceeded the MONTHLY quota for requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/DataCrawler/api/booking-com15. ${error}`
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const fetchedFromId = await fetchLocationId(fromLocation);
    const fetchedToId = await fetchLocationId(toLocation);
    console.log(fromLocation, toLocation, departDate);

    if (!fetchedFromId || !fetchedToId) {
      console.error(
        "Please ensure both 'From' and 'To' locations are selected."
      );
      setError(
        `Error fetching destination ID - You have exceeded the MONTHLY quota for requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/DataCrawler/api/booking-com15. ${error}`
      );
      return;
    }

    const searchUrl = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fetchedFromId}&toId=${fetchedToId}&departDate=${departDate}`;

    try {
      setLoading(true);
      const response = await fetch(searchUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "booking-com15.p.rapidapi.com",
        },
      });
      const result = await response.json();
      setAirlines(result.data.aggregation.airlines);
    } catch (error) {
      setError(
        `Error fetching destination ID - You have exceeded the MONTHLY quota for requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/DataCrawler/api/booking-com15. ${error}`
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleFlightClick = (flight: Airline) => {
    const savedFlights = localStorage.getItem("savedFlights")
      ? JSON.parse(localStorage.getItem("savedFlights") as string)
      : [];

    savedFlights.push(flight);

    localStorage.setItem("savedFlights", JSON.stringify(savedFlights));

    toast.success("flight added!");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className="bg-white p-5 rounded-lg shadow-xl w-full max-w-4xl  md:w-[45rem] h-[80vh] mx-4 overflow-hidden"
      >
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Flight Search
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputField
            type="text"
            label="From"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            placeholder="e.g. London, Paris"
            className="w-full"
          />
          <InputField
            type="text"
            label="Destination"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            placeholder="e.g. New York, Tokyo"
            className="w-full"
          />
        </div>

        <InputField
          type="date"
          label="Travel Date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          className="w-full mb-4"
        />

        <Button
          onClick={handleSearch}
          disabled={isButtonDisabled}
          label="Search Flights"
          className="w-full"
        />

        {loading ? (
          <div className="flex justify-center items-center my-8">
            <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : airlines.length > 0 ? (
          <div className="mt-1 h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Available Flights</h3>
            <div className="space-y-4">
              {airlines.map((airline) => (
                <div
                  key={airline.iataCode}
                  onClick={() => handleFlightClick(airline)}
                  className="flex items-center p-4 border rounded shadow-sm hover:shadow-lg hover:cursor-pointer hover:opacity-50 "
                >
                  <img
                    src={airline.logoUrl}
                    alt={airline.name}
                    className="mr-4 w-48 h-48"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{airline.name}</h4>
                    <p className="text-gray-600">IATA: {airline.iataCode}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-start mt-2">No airlines available.</p>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
