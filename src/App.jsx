import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

import MapContainer from "./Components/Map/MapContainer";
import PointsContainer from "./Components/Points/PointsContainer";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <MapContainer />
        <PointsContainer />
      </div>
    </DndProvider>
  );
}

export default App;
