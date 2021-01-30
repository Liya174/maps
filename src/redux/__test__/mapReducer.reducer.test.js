import mapReducer, {
  initialState,
  DELETE_POINT,
  ADD_NEW_POINT_FULL_INFO,
  CHANGE_SELECTED_POINT_SUCCESS,
  SET_SEARCH_BOX_VALUE,
  MOVE_POINT,
} from "../mapReducer";

const stateForCompare = { ...initialState };
const stateWithPoints = {
  ...initialState,
  points: [
    { id: 0, lat: 10, lng: 10, address: "", name: "" },
    { id: 1, lat: 11, lng: 13, address: "", name: "" },
  ],
};

describe("map reducer", () => {
  it("should return the initial state", () => {
    expect(mapReducer(undefined, {})).toEqual(stateForCompare);
  });

  it("should handle ADD_NEW_POINT_FULL_INFO", () => {
    const pointInfo = {
      lat: 10,
      lng: 20,
      address: "Add",
      name: "N",
      id: (+new Date()).toString(32),
    };
    expect(
      mapReducer(stateForCompare, {
        type: ADD_NEW_POINT_FULL_INFO,
        pointInfo,
      })
    ).toEqual({
      ...stateForCompare,
      points: [pointInfo],
      center: { lat: pointInfo.lat, lng: pointInfo.lng },
    });
  });

  it("should handle CHANGE_SELECTED_POINT_SUCCESS", () => {
    const pointInfo = { id: 0, lat: 6, lng: 3, address: "Add" };
    expect(
      mapReducer(stateWithPoints, {
        type: CHANGE_SELECTED_POINT_SUCCESS,
        pointInfo,
      })
    ).toEqual({
      ...stateWithPoints,
      points: [
        { id: 0, lat: 6, lng: 3, address: "Add", name: "" },
        { id: 1, lat: 11, lng: 13, address: "", name: "" },
      ],
      center: { lat: pointInfo.lat, lng: pointInfo.lng },
    });
  });

  it("should handle SET_SEARCH_BOX_VALUE", () => {
    const searchBoxValue = { test: "test" };
    expect(
      mapReducer(stateForCompare, {
        type: SET_SEARCH_BOX_VALUE,
        searchBoxValue,
      })
    ).toEqual({
      ...stateForCompare,
      searchBoxValue: searchBoxValue,
    });
  });

  it("should handle DELETE_POINT", () => {
    const pointId = 0;
    expect(
      mapReducer(stateWithPoints, {
        type: DELETE_POINT,
        pointId,
      })
    ).toEqual({
      ...stateWithPoints,
      points: [{ id: 1, lat: 11, lng: 13, address: "", name: "" }],
    });
  });

  it("should handle MOVE_POINT", () => {
    const dragIndex = 0;
    const hoverIndex = 1;
    expect(
      mapReducer(stateWithPoints, {
        type: MOVE_POINT,
        dragIndex,
        hoverIndex,
      })
    ).toEqual({
      ...stateWithPoints,
      points: [
        { id: 1, lat: 11, lng: 13, address: "", name: "" },
        { id: 0, lat: 10, lng: 10, address: "", name: "" },
      ],
    });
  });
});
