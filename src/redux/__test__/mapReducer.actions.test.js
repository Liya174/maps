import {
  addNewPointFullInfo,
  deletePoint,
  changeSelectedPointSuccess,
  setSearchBoxValue,
  movePoint,
} from "../mapReducer";

import {
  DELETE_POINT,
  ADD_NEW_POINT_FULL_INFO,
  CHANGE_SELECTED_POINT_SUCCESS,
  SET_SEARCH_BOX_VALUE,
  MOVE_POINT,
} from "../mapReducer";

describe("actions", () => {
  it("should create an action to add new point full info", () => {
    const pointInfo = { lat: 10, lng: 20, address: "address", name: "name" };
    const expectedAction = {
      type: ADD_NEW_POINT_FULL_INFO,
      pointInfo,
    };
    expect(addNewPointFullInfo(pointInfo)).toEqual(expectedAction);
  });

  it("should create an action to delete a point", () => {
    const pointId = 13;
    const expectedAction = {
      type: DELETE_POINT,
      pointId,
    };
    expect(deletePoint(pointId)).toEqual(expectedAction);
  });

  it("should create an action to change selected point info", () => {
    const pointInfo = { lat: 10, lng: 20, address: "address", name: "name" };
    const expectedAction = {
      type: CHANGE_SELECTED_POINT_SUCCESS,
      pointInfo,
    };
    expect(changeSelectedPointSuccess(pointInfo)).toEqual(expectedAction);
  });

  it("should create an action to set searchBox value", () => {
    const searchBoxValue = { example: "example" };
    const expectedAction = {
      type: SET_SEARCH_BOX_VALUE,
      searchBoxValue,
    };
    expect(setSearchBoxValue(searchBoxValue)).toEqual(expectedAction);
  });

  it("should create an action to move a point", () => {
    const dragIndex = 1;
    const hoverIndex = 2;
    const expectedAction = {
      type: MOVE_POINT,
      dragIndex,
      hoverIndex,
    };
    expect(movePoint(dragIndex, hoverIndex)).toEqual(expectedAction);
  });
});
