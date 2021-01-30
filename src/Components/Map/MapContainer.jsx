import { connect } from "react-redux";
import Map from "./Map";
import {
  addNewPoint,
  changeSelectedPoint,
  addNewPointFullInfo,
  setSearchBoxValue,
} from "../../redux/mapReducer";

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps, {
  addNewPoint,
  changeSelectedPoint,
  addNewPointFullInfo,
  setSearchBoxValue,
})(Map);
