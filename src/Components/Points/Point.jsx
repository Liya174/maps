import style from "./Points.module.css";

const Point = ({ pointInfo, deletePoint }) => {
  return (
    <div className={style.point}>
      <span>{pointInfo.address || `${pointInfo.lat} ${pointInfo.lng}`}</span>
      <button
        className={style.button}
        onClick={() => deletePoint(pointInfo.id)}
      >
        Удалить
      </button>
    </div>
  );
};

export default Point;
