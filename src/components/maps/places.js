import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { MAP_API_KEY } from "../../constants/urls";
import InputDropDown from "../input-drop-down/input-drop-down";

export default function Places({ getLongitudeLatitude }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_API_KEY.dev,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      getLongitudeLatitude={(value) => {
        getLongitudeLatitude(value);
      }}
    />
  );
}

function Map({ getLongitudeLatitude }) {
  //   const center = useMemo(
  //     () => ({
  //       lat: 5.646719699999999,
  //       lng: -0.1537046,
  //     }),
  //     []
  //   );
  const center = {
    lat: 5.646719699999999,
    lng: -0.1537046,
  };
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(50);
  // Initialize map
  useEffect(() => {
    setSelected(center);
  }, []);

  useEffect(() => {
    getLongitudeLatitude && getLongitudeLatitude(selected);
  }, [selected?.lat, selected?.lng]);
  return (
    <div className="flex w-full h-full flex-col relative p-6">
      <div className="h-20 w-full flex justify-center">
        <PlacesAutocomplete
          setSelected={(value) => {
            setSelected(value);
          }}
          className="bg-black"
        />
      </div>
      <GoogleMap
        zoom={zoom}
        center={{ lat: selected?.lat, lng: selected?.lng }}
        mapContainerClassName="w-full h-full"
      >
        {<Marker position={{ lat: selected?.lat, lng: selected?.lng }} />}
      </GoogleMap>
    </div>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const [suggestionsData, setSuggestionsData] = useState(0);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng, address });
  };
  const processSuggestionData = (data) => {
    let dropDown = [];
    data.forEach((item) => {
      let fullInfo = item.description.split(",");
      dropDown.push({
        name: fullInfo[0],
        moreInfo: fullInfo[1],
        fullDescription: item.description,
      });
    });
    setSuggestionsData(dropDown);
  };
  useEffect(() => {
    status === "OK" && processSuggestionData(data);
  }, [data]);
  return (
    <div className="w-full h-full flex justify-center items-center bg-white">
      <InputDropDown
        propertyForSecondaryText="moreInfo"
        fullDescription="fullDescription"
        propertyForDropdown="name"
        inputData={suggestionsData}
        handleSelect={(value) => {
          handleSelect(value);
        }}
        handleChange={(value) => {
          // setInterval(() => {
          // }, 400);
          setValue(value);
        }}
        disabled={!ready}
      />
    </div>
    // <Combobox
    //   className="w-full focus:outline-none focus:border-0"
    //   onSelect={handleSelect}
    // >
    //   <ComboboxInput
    //     value={value}
    //     onChange={(e) => setValue(e.target.value)}
    //     disabled={!ready}
    //     className="h-20 px-3  w-full"
    //     placeholder="Search an address"
    //   />
    //   <ComboboxPopover>
    //     <ComboboxList>
    // {status === "OK" &&
    //   data.map(({ place_id, description }) => (
    //     <ComboboxOption key={place_id} value={description} />
    //   ))}
    //     </ComboboxList>
    //   </ComboboxPopover>
    // </Combobox>
  );
};
