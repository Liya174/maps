import { connect } from "react-redux";
import Points from "./Points";
import { deletePoint } from "../../redux/mapReducer";

const mapStateToProps = (state) => ({
  points: state.map.points,
});

export default connect(mapStateToProps, { deletePoint })(Points);
