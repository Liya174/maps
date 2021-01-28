import { connect } from "react-redux";
import Map from "./Map";
import { addNewPoint } from "../../redux/mapReducer";
import style from "./Map.module.css";

const MapContainer = (props) => {
  const API_KEY = "AIzaSyCPNQQYWWZfP_dAs-TCfcjM2RlTqIQulXk";

  return (
    <div className={style.map}>
      <Map
        map={props.map}
        addNewPoint={props.addNewPoint}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps, {
  addNewPoint,
})(MapContainer);
