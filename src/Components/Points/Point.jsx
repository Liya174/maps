import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPE from "./data/types";
import style from "./Points.module.css";

const Point = ({ point, index, deletePoint, movePoint }) => {
  const id = point.id;
  //drag&drop элементов
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(point, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = point.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // расчёт значений для определения пересечения элемента
      //при пересечении больше, чем на половину высоты, - изменение порядка элементов в массиве
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // движение вниз меньше, чем на половину
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // движение вверх меньше, чем на половину
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // изменение порядка элементов в массиве
      movePoint(dragIndex, hoverIndex);
      point.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPE, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${style.point} ${isDragging ? style.druggingPoint : ""}`}
      draggable={true}
      data-testid={"point"}
    >
      <span className={style.address}>
        <strong>{point.name ? `${point.name}, ` : ""}</strong>
        {point.address || `${point.lat} ${point.lng}`}
      </span>
      <button className={style.button} onClick={() => deletePoint(point.id)}>
        Удалить
      </button>
    </div>
  );
};

export default Point;
