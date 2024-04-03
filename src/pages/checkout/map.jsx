import { Location } from "iconsax-react";
import { useEffect, useState } from "react";
import { geoLocation } from "../../utils/geoLocation";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

function Maps() {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState();

  const geoClick = () => {
    setLoading(false);
    geoLocation(setUserLocation);
    setTimeout(() => {
      setLoading(true);
    }, [2000]);
  };

  useEffect(() => {
    geoLocation(setUserLocation);

    setTimeout(() => {
      setLoading(true);
    }, [2000]);
  }, []);

  if (!loading)
    return (
      <>
        <div className="loading h-[242px] rounded-[12px] border-[#E3E8EF] border mb-6">
          <span></span>
        </div>

        <div className="px-9 mb-4">
          <div className="loading h-[26px] border-[#E3E8EF] border rounded max-w-16 inline-block">
            <span></span>
          </div>
          <div className="loading min-h-[50px] rounded-[12px] border-[#E3E8EF] border">
            <span></span>
          </div>
        </div>
      </>
    );
  return (
    <>
      <YMaps>
        <Map
          className="w-full h-[242px] overflow-hidden rounded-[12px] border-[#E3E8EF] border mb-6"
          defaultState={{
            zoom: 9,
            center: userLocation,
          }}
        >
          <Placemark geometry={userLocation} />
        </Map>
      </YMaps>

      <div className="px-9 mb-4">
        <h3 className="font-medium text-base mb-2">Адрес</h3>
        <label
          htmlFor="location"
          className="relative flex rounded-[12px] border-[#E3E8EF] border text-base py-3 px-4"
        >
          <input
            type="text"
            defaultValue={userLocation}
            className="w-full outline-none"
          />
          <button onClick={() => geoClick()}>
            <Location
              size="18"
              color="#111729"
              className="hover:opacity-80 transition"
            />
          </button>
        </label>
      </div>
    </>
  );
}

export default Maps;
