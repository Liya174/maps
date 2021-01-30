import React from "react";
// import { useEffect, useState } from "react";
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
  addNewPoint,
  addNewPointFullInfo,
  changeSelectedPoint,
  setSearchBoxValue,
}) => {
  const markersLatLng = points.map(({ lat, lng }) => ({ lat, lng }));

  // локальный стейт для привзяки координат polyline при движении маркера
  // const [markersLatLng, setMarkersLatLng] = useState([]);
  // useEffect(() => {
  //   const list = points.map(({ id, lat, lng }) => ({ id, lat, lng }));
  //   setMarkersLatLng(list);
  // }, [points]);

  const getInfoFromSearchBox = () => {
    const {
      name,
      geometry: {
        location: { lat, lng },
      },
      formatted_address: address,
    } = searchBoxValue.getPlaces()[0];
    addNewPointFullInfo({ lat: lat(), lng: lng(), address, name });
  };

  return (
    <div className={style.map} data-testid={"map"}>
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

          {points.map((point, index) => (
            <Marker
              position={{ lat: point.lat, lng: point.lng }}
              key={point.id}
              draggable={true}
              // при движении маркера его актуальные координаты записываются в локальный стейт
              // onDrag={(e) => {
              //   const newMarkersLatLng = [...markersLatLng];
              //   newMarkersLatLng[index] = {
              //     lat: e.latLng.lat(),
              //     lng: e.latLng.lng(),
              //   };
              //   setMarkersLatLng(newMarkersLatLng);
              // }}
              onDragEnd={(e) => {
                changeSelectedPoint(point.id, e.latLng.lat(), e.latLng.lng());
              }}
            />
          ))}
          <Polyline path={markersLatLng} options={{ strokeColor: "red" }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default React.memo(Map);
