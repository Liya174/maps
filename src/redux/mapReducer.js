import { getAddressFromCoords, getCoordsFromAddress } from "../utils/geocoder";

const GOOGLE_MAPS_API_KEY = "AIzaSyCPNQQYWWZfP_dAs-TCfcjM2RlTqIQulXk";
const DELETE_POINT = "map/DELETE_POINT";
const ADD_NEW_POINT_SUCCESS = "map/ADD_NEW_POINT_SUCCESS";
const CHANGE_SELECTED_POINT_SUCCESS = "map/CHANGE_SELECTED_POINT_SUCCESS";

//---------------INITIAL STATE----------------------
const initialState = {
  mapsSettings: {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}`,
  },
  zoom: 14,
  center: {
    lat: 56.844,
    lng: 60.653,
  },
  points: [],
};

//---------------REDUCER----------------------
const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_POINT_SUCCESS: {
      const newPoint = {
        id: state.points.length
          ? state.points[state.points.length - 1].id + 1
          : 0,
        lat: action.pointInfo.lat,
        lng: action.pointInfo.lng,
        address: action.pointInfo.address,
      };

      return {
        ...state,
        points: [...state.points, newPoint],
      };
    }

    case CHANGE_SELECTED_POINT_SUCCESS: {
      const { id, lat, lng, address } = action.pointInfo;

      return {
        ...state,
        points: state.points.map((point) =>
          point.id === id ? { ...point, lat, lng, address } : point
        ),
      };
    }

    case DELETE_POINT:
      return {
        ...state,
        points: state.points.filter((point) => point.id !== action.pointId),
      };

    default:
      return state;
  }
};

//---------------ACTION_CREATORS----------------------
export const addNewPointSuccess = (pointInfo) => ({
  type: ADD_NEW_POINT_SUCCESS,
  pointInfo,
});

export const deletePoint = (pointId) => ({
  type: DELETE_POINT,
  pointId,
});

export const changeSelectedPointSuccess = (pointInfo) => ({
  type: CHANGE_SELECTED_POINT_SUCCESS,
  pointInfo,
});

//--------------------THUNKS-----------------------------
export const addNewPoint = (lat, lng) => async (dispatch) => {
  const address = await getAddressFromCoords(lat, lng, GOOGLE_MAPS_API_KEY);
  dispatch(addNewPointSuccess({ lat, lng, address }));
};

export const getAddressData = (address) => async (dispatch) => {
  const { lat, lng } = await getCoordsFromAddress(address, GOOGLE_MAPS_API_KEY);
  dispatch(addNewPointSuccess({ lat, lng, address }));
};

export const changeSelectedPoint = (id, lat, lng) => async (dispatch) => {
  const address = await getAddressFromCoords(lat, lng, GOOGLE_MAPS_API_KEY);
  dispatch(changeSelectedPointSuccess({ id, lat, lng, address }));
};

export default mapReducer;
