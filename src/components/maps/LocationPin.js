import { LocationMarkerIcon } from "@heroicons/react/solid";

export const LocationPin = ({ text }) => (
  <div className="pin">
    <LocationMarkerIcon className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);
