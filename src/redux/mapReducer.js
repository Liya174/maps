const DELETE_POINT = "map/DELETE_POINT";
const ADD_NEW_POINT = "map/ADD_NEW_POINT";

//---------------INITIAL STATE----------------------
const initialState = {
  zoom: 14,
  center: {
    lat: 56.844,
    lng: 60.653,
  },
  points: [
    {
      id: 0,
      lat: 57.844,
      lng: 60.653,
    },
    {
      id: 1,
      lat: 56.844,
      lng: 61.653,
    },
    {
      id: 2,
      lat: 56.844,
      lng: 60.653,
    },
  ],
};

//---------------REDUCER----------------------
const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_POINT: {
      const newPoint = {
        id: state.points[state.points.length - 1].id + 1,
        lat: action.pointLat,
        lng: action.pointLng,
      };

      return {
        ...state,
        points: [...state.points, newPoint],
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
export const addNewPoint = (pointLat, pointLng) => ({
  type: ADD_NEW_POINT,
  pointLat,
  pointLng,
});

export const deletePoint = (pointId) => ({
  type: DELETE_POINT,
  pointId,
});

//--------------------THUNKS-----------------------------

export default mapReducer;
