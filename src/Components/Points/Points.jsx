import Point from "./Point";
import style from "./Points.module.css";

const Points = ({ points, deletePoint }) => {
  return (
    <div className={style.points}>
      {points.map((point) => (
        <Point pointInfo={point} deletePoint={deletePoint} key={point.id} />
      ))}
    </div>
  );
};

export default Points;
