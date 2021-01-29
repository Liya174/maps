import { getAddressFromCoords } from "../utils/geocoder";

//---------------CONSTS----------------------
const GOOGLE_MAPS_API_KEY = "AIzaSyCPNQQYWWZfP_dAs-TCfcjM2RlTqIQulXk";
const DELETE_POINT = "map/DELETE_POINT";
const ADD_NEW_POINT_FULL_INFO = "map/ADD_NEW_POINT_FULL_INFO";
const CHANGE_SELECTED_POINT_SUCCESS = "map/CHANGE_SELECTED_POINT_SUCCESS";
const SET_SEARCH_BOX_VALUE = "map/SET_SEARCH_BOX_VALUE";

//---------------INITIAL STATE----------------------
const initialState = {
  mapsSettings: {
    apiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
    height: 400,
  },
  zoom: 14,
  center: {
    lat: 56.844,
    lng: 60.653,
  },
  //TODO: get bounds from current map
  bounds: {
    east: 60.67862046051024,
    north: 56.85310574898769,
    south: 56.786365589257706,
    west: 60.50087464599413,
  },
  points: [],
  searchBoxValue: null,
};

//---------------REDUCER----------------------
const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_POINT_FULL_INFO: {
      const { lat, lng, address } = action.pointInfo;
      const newPointId = state.points.length
        ? state.points[state.points.length - 1].id + 1
        : 0;
      return {
        ...state,
        points: [...state.points, { id: newPointId, lat, lng, address }],
        center: { lat, lng },
      };
    }

    case CHANGE_SELECTED_POINT_SUCCESS: {
      const { id, lat, lng, address } = action.pointInfo;

      return {
        ...state,
        points: state.points.map((point) =>
          point.id === id ? { ...point, lat, lng, address } : point
        ),
        center: { lat, lng },
      };
    }

    case SET_SEARCH_BOX_VALUE:
      return {
        ...state,
        searchBoxValue: action.searchBoxValue,
      };

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
export const addNewPointFullInfo = (pointInfo) => ({
  type: ADD_NEW_POINT_FULL_INFO,
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

export const setSearchBoxValue = (searchBoxValue) => ({
  type: SET_SEARCH_BOX_VALUE,
  searchBoxValue,
});

//--------------------THUNKS-----------------------------
export const addNewPoint = (lat, lng) => async (dispatch) => {
  const address = await getAddressFromCoords(lat, lng, GOOGLE_MAPS_API_KEY);
  dispatch(addNewPointFullInfo({ lat, lng, address }));
};

export const changeSelectedPoint = (id, lat, lng) => async (dispatch) => {
  const address = await getAddressFromCoords(lat, lng, GOOGLE_MAPS_API_KEY);
  dispatch(changeSelectedPointSuccess({ id, lat, lng, address }));
};

export default mapReducer;
