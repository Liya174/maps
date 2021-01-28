import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import { compose } from "redux";
import Search from "./Search";

const Map = ({
  map: { zoom, center, points },
  isMarkerShown,
  addNewPoint,
  changeSelectedPoint,
  getAddressData,
  ...props
}) => {
  const pointsCoordinates = points.map((point) => {
    return {
      lat: point.lat,
      lng: point.lng,
    };
  });

  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{ lat: center.lat, lng: center.lng }}
      onClick={(e) => addNewPoint(e.latLng.lat(), e.latLng.lng())}
    >
      <Search center={center} getAddressData={getAddressData} />
      {points.map((point) => (
        <Marker
          position={{ lat: point.lat, lng: point.lng }}
          key={point.id}
          draggable={true}
          onDragEnd={(e) =>
            changeSelectedPoint(point.id, e.latLng.lat(), e.latLng.lng())
          }
        />
      ))}
      <Polyline path={pointsCoordinates} strokeColor={"red"} draggable={true} />
    </GoogleMap>
  );
};

export default compose(withScriptjs, withGoogleMap)(Map);
