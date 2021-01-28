import { connect } from "react-redux";
import Map from "./Map";
import {
  addNewPoint,
  changeSelectedPoint,
  getAddressData,
} from "../../redux/mapReducer";
import style from "./Map.module.css";

const MapContainer = (props) => {
  return (
    <div className={style.map}>
      <Map
        map={props.map}
        addNewPoint={props.addNewPoint}
        changeSelectedPoint={props.changeSelectedPoint}
        getAddressData={props.getAddressData}
        googleMapURL={props.map.mapsSettings.googleMapURL}
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
  changeSelectedPoint,
  getAddressData,
})(MapContainer);
