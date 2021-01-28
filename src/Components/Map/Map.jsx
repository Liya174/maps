import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
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
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{ lat: center.lat, lng: center.lng }}
      onClick={(e) => addNewPoint(e.latLng.lat(), e.latLng.lng())}
    >
      <Search center={center} getAddressData={getAddressData} />
      {/* {points.map((point) => (
        <Marker
          key={point.id}
          position={{ lat: point.lat, lng: point.lng }}
          draggable={true}
          onDragEnd={(e) =>
            changeSelectedPoint(point.id, e.latLng.lat(), e.latLng.lng())
          }
        />
      ))} */}
    </GoogleMap>
  );
};

export default compose(withScriptjs, withGoogleMap)(Map);
