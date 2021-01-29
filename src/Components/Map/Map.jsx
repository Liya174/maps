import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import style from "./Map.module.css";

const Map = ({
  map: {
    zoom,
    center,
    bounds,
    points,
    mapsSettings: { apiKey, libraries, height },
    searchBoxValue,
  },
  isMarkerShown,
  addNewPoint,
  addNewPointFullInfo,
  changeSelectedPoint,
  setSearchBoxValue,
  ...props
}) => {
  const pointsCoordinates = points.map(({ lat, lng }) => ({ lat, lng }));

  const getInfoFromSearchBox = () => {
    const pointInfo = searchBoxValue.getPlaces()[0];
    const pointMainInfo = {
      lat: pointInfo.geometry.location.lat(),
      lng: pointInfo.geometry.location.lng(),
      address: pointInfo["formatted_address"],
    };
    addNewPointFullInfo(pointMainInfo);
  };
  console.log(props);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <GoogleMap
        zoom={zoom}
        center={{ lat: center.lat, lng: center.lng }}
        mapContainerStyle={{ height: `${height}px` }}
        onClick={(e) => {
          addNewPoint(e.latLng.lat(), e.latLng.lng());
        }}
        // onBoundsChanged={(e) =>}
      >
        <StandaloneSearchBox
          onLoad={(value) => {
            setSearchBoxValue(value);
          }}
          onPlacesChanged={getInfoFromSearchBox}
          bounds={bounds}
        >
          <input
            type="text"
            placeholder="Найти точку"
            className={style.input}
          />
        </StandaloneSearchBox>

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
        <Polyline
          path={pointsCoordinates}
          options={{ strokeColor: "red" }}
          draggable={true}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Map);
