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
    lat: 56.844,
    lng: 60.653,
  },
  bounds: {
    east: 60.67862046051024,
    north: 56.85310574898769,
    south: 56.786365589257706,
    west: 60.50087464599413,
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
