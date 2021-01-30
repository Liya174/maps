import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { render, screen, fireEvent } from "@testing-library/react";
import Point from "../Point";
import userEvent from "@testing-library/user-event";

const props = {
  point: { id: 13, lat: 36, lng: 63, address: "address", name: "name" },
  index: 0,
};

describe("Point", () => {
  it("Point with full point-props show address, name and button; doesn't show coordinates", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <Point point={props.point} index={props.index} />
      </DndProvider>
    );
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/address/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByText("36 63")).toBeNull();

    expect(screen.getByText(/address/i)).toHaveClass("address");
  });

  it("Point without name show address, doesn't show coordinates", () => {
    const pointInfo = {
      id: 13,
      lat: 50,
      lng: 30,
      address: "address",
      name: "",
    };
    render(
      <DndProvider backend={HTML5Backend}>
        <Point point={pointInfo} index={props.index} />
      </DndProvider>
    );
    expect(screen.getByText("address")).toBeInTheDocument();
    expect(screen.queryByText("50 30")).toBeNull();
  });

  it("Point without name and address show coordinates", () => {
    const pointInfo = { id: 13, lat: 50, lng: 30, address: "", name: "" };
    render(
      <DndProvider backend={HTML5Backend}>
        <Point point={pointInfo} index={props.index} />
      </DndProvider>
    );
    expect(screen.getByText("50 30")).toBeInTheDocument();
  });

  it("Click on a button calls handlerClick", () => {
    const handleClick = jest.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <Point
          point={props.point}
          index={props.index}
          deletePoint={handleClick}
        />
      </DndProvider>
    );
    userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
