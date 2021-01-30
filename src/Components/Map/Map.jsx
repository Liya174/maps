import React, { useState } from "react";
import { useEffect } from "react";
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
  // локальный стейт для привзяки координат polyline к маркерам
  const [markersLatLng, setMarkersLatLng] = useState([]);
  useEffect(() => {
    const list = points.map(({ id, lat, lng }) => ({ id, lat, lng }));
    setMarkersLatLng(list);
  }, [points]);

  // запись координат маркера (при движении) в локальный стейт
  const changeMarkerCoordinates = (e, index) => {
    const newMarkersLatLng = [...markersLatLng];
    newMarkersLatLng[index] = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkersLatLng(newMarkersLatLng);
  };

  //извлечение адреса из seachbox и добавление в стейт
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
          center={{ ...center }}
          mapContainerStyle={{ height: `${height}px` }}
          onClick={(e) => {
            addNewPoint(e.latLng.lat(), e.latLng.lng());
          }}
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

          {points &&
            points.map(({ lat, lng, id }, index) => (
              <Marker
                position={{
                  lat: markersLatLng[index] ? markersLatLng[index].lat : lat,
                  lng: markersLatLng[index] ? markersLatLng[index].lng : lng,
                }}
                key={id}
                draggable={true}
                onDrag={(e) => changeMarkerCoordinates(e, index)}
                onDragEnd={(e) => {
                  changeSelectedPoint(id, e.latLng.lat(), e.latLng.lng());
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
