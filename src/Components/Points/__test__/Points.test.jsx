import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { render, screen, fireEvent } from "@testing-library/react";
import Points from "../Points";

const points = [{ id: 13 }, { id: 27 }, { id: 327 }];

describe("Points", () => {
  it("Point's quantity (check testId) equals incoming points-array length", () => {
    render(<Points points={points} />);
    expect(screen.getAllByTestId("point").length).toBe(points.length);
  });

  it("If points-array is empty show message", () => {
    render(<Points points={[]} />);
    expect(screen.getByTestId("text")).toBeInTheDocument();
  });
});
