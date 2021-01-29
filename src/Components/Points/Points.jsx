import Point from "./Point";
import style from "./Points.module.css";

const Points = ({ points, deletePoint, movePoint }) => {
  return (
    <div className={style.points}>
      {points.map((point, index) => (
        <Point
          key={point.id}
          point={point}
          index={index}
          movePoint={movePoint}
          deletePoint={deletePoint}
        />
      ))}
    </div>
  );
};

export default Points;
