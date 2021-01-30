import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Point from "./Point";
import style from "./Points.module.css";

const Points = ({ points, deletePoint, movePoint }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style.points}>
        {points.length > 0 ? (
          points.map((point, index) => (
            <Point
              key={point.id}
              point={point}
              index={index}
              movePoint={movePoint}
              deletePoint={deletePoint}
            />
          ))
        ) : (
          <div className={style.text} data-testid={"text"}>
            Для добавления пункта воспользуйтесь строкой поиска
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Points;
