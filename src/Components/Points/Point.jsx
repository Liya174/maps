import style from "./Points.module.css";

const Point = ({
  pointInfo,
  deletePoint,
  // index,
  // dragStartHandler,
  // dragEndHandler,
  // dragOverHandler,
  // dropHandler,
}) => {
  return (
    <div
      className={style.point}
      draggable={true}
      // onDragStart={(e) => dragStartHandler(e, index)}
      // onDragLeave={(e) => dragEndHandler(e)}
      // onDragEnd={(e) => dragEndHandler(e)}
      // onDragOver={(e) => dragOverHandler(e)}
      // onDrop={(e) => dropHandler(e, index)}
    >
      <span className={style.address}>
        {pointInfo.address || `${pointInfo.lat} ${pointInfo.lng}`}
      </span>
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
