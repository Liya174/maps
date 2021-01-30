import "./App.css";

import MapContainer from "./Components/Map/MapContainer";
import PointsContainer from "./Components/Points/PointsContainer";

function App() {
  return (
    <div className="container">
      <MapContainer />
      <PointsContainer />
    </div>
  );
}

export default App;
