import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { compose } from "redux";
import style from "./Map.module.css";
import Search from "./Search";

const Map = ({
  map: { zoom, center, points },
  isMarkerShown,
  addNewPoint,
  ...props
}) => {
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{ lat: center.lat, lng: center.lng }}
      onClick={(e) => addNewPoint(e.latLng.lat(), e.latLng.lng())}
    >
      <Search center={center} addNewPoint={addNewPoint} />
      {points.map((point) => (
        <Marker position={{ lat: point.lat, lng: point.lng }} key={point.id} />
      ))}
    </GoogleMap>
  );
};

export default compose(withScriptjs, withGoogleMap)(Map);
