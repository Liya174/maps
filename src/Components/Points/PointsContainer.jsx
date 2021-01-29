import { connect } from "react-redux";
import Points from "./Points";
import { deletePoint, movePoint } from "../../redux/mapReducer";

const mapStateToProps = (state) => ({
  points: state.map.points,
});

export default connect(mapStateToProps, { deletePoint, movePoint })(Points);
