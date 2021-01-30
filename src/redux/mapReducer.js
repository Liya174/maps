import { getAddressFromCoords } from "../utils/geocoder";
import update from "immutability-helper";

//---------------CONSTS----------------------
export const GOOGLE_MAPS_API_KEY = "AIzaSyCPNQQYWWZfP_dAs-TCfcjM2RlTqIQulXk";
export const DELETE_POINT = "map/DELETE_POINT";
export const ADD_NEW_POINT_FULL_INFO = "map/ADD_NEW_POINT_FULL_INFO";
export const CHANGE_SELECTED_POINT_SUCCESS =
  "map/CHANGE_SELECTED_POINT_SUCCESS";
export const SET_SEARCH_BOX_VALUE = "map/SET_SEARCH_BOX_VALUE";
export const MOVE_POINT = "map/MOVE_POINT";

//---------------INITIAL STATE----------------------
export const initialState = {
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
      const { lat, lng, address, name } = action.pointInfo;
      const id = (+new Date()).toString(32);

      return {
        ...state,
        points: [...state.points, { id, lat, lng, address, name }],
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

    case MOVE_POINT: {
      const { dragIndex, hoverIndex } = action;
      const dragCard = state.points[dragIndex];
      const newPointsList = update(state.points, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      });

      return {
        ...state,
        points: newPointsList,
      };
    }

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

export const movePoint = (dragIndex, hoverIndex) => ({
  type: MOVE_POINT,
  dragIndex,
  hoverIndex,
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
