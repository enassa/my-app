import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MAP_API_KEY } from "../../constants/urls";

export default function MyMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_API_KEY.dev,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="w-full h-full">
      <Marker position={center} />
    </GoogleMap>
  );
}
