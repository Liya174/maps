import { connect } from "react-redux";
import Map from "./Map";
import {
  addNewPoint,
  changeSelectedPoint,
  addNewPointFullInfo,
  setSearchBoxValue,
} from "../../redux/mapReducer";
import style from "./Map.module.css";

const MapContainer = (props) => {
  return (
    <div className={style.map}>
      <Map
        map={props.map}
        addNewPoint={props.addNewPoint}
        addNewPointFullInfo={props.addNewPointFullInfo}
        changeSelectedPoint={props.changeSelectedPoint}
        setSearchBoxValue={props.setSearchBoxValue}
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
  addNewPointFullInfo,
  setSearchBoxValue,
})(MapContainer);
