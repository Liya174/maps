import style from "./Points.module.css";

const Point = ({ pointInfo, deletePoint }) => {
  return (
    <div className={style.point}>
      <p>
        Lat:{pointInfo.lat}, lng:{pointInfo.lng}
      </p>
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
