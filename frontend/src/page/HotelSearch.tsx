import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaRegClock, FaStar } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HotelSearchProps {
  onClose: () => void;
}

interface Hotel {
  property: any;
  priceBreakdown: {
    grossPrice: {
      value: number;
    };
  };
  name: string;
  logoUrl: string;
  count: number;
  minPrice: {
    currencyCode: string;
    units: number;
    nanos: number;
  };
  photoUrls: string[];
}

const HotelSearch: React.FC<HotelSearchProps> = ({ onClose }) => {
  const [location, setLocation] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [destId, setDestId] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<string>("CITY");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  const isButtonDisabled =
    !location || !departureDate || !arrivalDate || loading;

  const handleHotelClick = (hotel: Hotel) => {
    const savedHotels = localStorage.getItem("savedHotels")
      ? JSON.parse(localStorage.getItem("savedHotels") as string)
      : [];

    savedHotels.push(hotel);

    localStorage.setItem("savedHotels", JSON.stringify(savedHotels));
    toast.success("Hotel added!");
  };

  const fetchDestId = async (location: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${location}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "booking-com15.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      const dest = data.data?.[0];
      console.log("destid main thing ", dest.dest_id, dest.search_type);

      setDestId(dest?.dest_id || null);
      setSearchType(dest?.search_type || "CITY");
    } catch (error) {
      setError(
        `Too Many Requests - You have exceeded the MONTHLY quota for requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/DataCrawler/api/booking-com15. ${error}`
      );
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = async () => {
    if (!destId || !arrivalDate || !departureDate) {
      console.error("Please provide all required information.");
      return;
    }

    const searchUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${destId}&search_type=${searchType}&arrival_date=${arrivalDate}&departure_date=${departureDate}`;

    try {
      setLoading(true);
      const response = await fetch(searchUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "booking-com15.p.rapidapi.com",
        },
      });
      const result = await response.json();

      setHotels(result.data.hotels || []);
      console.log("hotels ", result.data.hotels);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl h-[95vh] mx-4 overflow-hidden"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Hotel Search
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            required
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={() => fetchDestId(location)}
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            required
            type="date"
            placeholder="Arrival Date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            required
            type="date"
            placeholder="Departure Date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          disabled={isButtonDisabled}
          onClick={handleSearch}
          className={` bg-blue-600 ${
            isButtonDisabled ? " opacity-50 cursor-not-allowed" : ""
          } text-white px-4 py-3 rounded-lg w-full mt-2 mb-4 hover:bg-blue-700 transition font-semibold`}
        >
          Search Hotels
        </button>

        {loading ? (
          <div className="flex justify-center items-center my-8">
            <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="mt-4 h-96 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Available Hotels
            </h3>
            <div className="space-y-4">
              {hotels.length > 0 ? (
                hotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center p-4 border rounded-lg hover:shadow-lg hover:cursor-pointer hover:opacity-50 shadow-sm bg-gray-50"
                    onClick={() => handleHotelClick(hotel)}
                  >
                    <img
                      src={hotel.property.photoUrls[0] || "/fallback-image.png"}
                      alt={hotel.property.name || "Hotel"}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover mb-4 sm:mb-0"
                    />
                    <div className="flex-1 sm:ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {hotel.property.name || "Unnamed Hotel"}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {hotel.property.shortDescription ||
                          "No description available."}
                      </p>
                      <div className="flex items-center space-x-2 text-gray-600 text-sm">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span>Location Info</span>
                        <FaStar className="text-yellow-400 ml-4" />
                        <span>
                          {hotel.property.reviewsStats?.combinedNumericStats
                            .average || "N/A"}{" "}
                          (
                          {hotel.property.reviewsStats?.combinedNumericStats
                            .total || "0"}
                          )
                        </span>
                        <FaRegClock className="ml-4" />
                        <span>1 Night</span>
                      </div>
                    </div>

                    <div className="text-right sm:ml-4">
                      <p className="text-xl font-bold text-gray-800">
                        $
                        {hotel.property.priceBreakdown.grossPrice.value ||
                          "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">Available Dates</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm mb-2">
                  No hotels available.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
