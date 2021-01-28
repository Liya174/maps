import Geocode from "react-geocode";

const initialGeocode = (apiKey) => {
  Geocode.setApiKey(apiKey);
  Geocode.setLanguage("ru");
  Geocode.setRegion("ru");
};

export const getAddressFromCoords = async (lat, lng, apiKey) => {
  initialGeocode(apiKey);
  const response = await Geocode.fromLatLng(lat, lng);
  if (response.status === "OK") {
    return response.results[0].formatted_address;
  } else {
    return "error";
  }
};

export const getCoordsFromAddress = async (address, apiKey) => {
  initialGeocode(apiKey);
  const response = await Geocode.fromAddress(address);
  if (response.status === "OK") {
    return response.results[0].geometry.location;
  } else {
    return "error";
  }
};
