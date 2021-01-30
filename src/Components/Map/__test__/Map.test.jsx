// import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import Map from "../Map";

const map = {
  mapsSettings: {
    apiKey: "AIzaSyCPNQQYWWZfP_dAs-TCfcjM2RlTqIQulXk",
    libraries: ["places"],
    height: 400,
  },
  zoom: 14,
  center: {
    lat: 56,
    lng: 60,
  },
  bounds: {
    east: 61,
    north: 57,
    south: 55,
    west: 59,
  },
  points: [],
  searchBoxValue: null,
};

describe("Map", () => {
  it("renders Map correctly", async () => {
    render(<Map map={map} />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
    // expect(
    //   await screen.findByPlaceholderText("Найти точку")
    // ).toBeInTheDocument();
  });
});
