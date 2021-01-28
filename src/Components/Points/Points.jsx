import { useState } from "react";
import Point from "./Point";
import style from "./Points.module.css";

const Points = ({ points, deletePoint }) => {
  // const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // const dragStartHandler = (e, index) => {
  //   setCurrentCardIndex(index);
  //   console.log("index: ", index);
  // };
  // const dragEndHandler = (e) => {
  //   e.target.closest("div").style.border = "1px solid #9c9c9c";
  //   e.target.closest("div").style.color = "#000000";
  // };
  // const dragOverHandler = (e) => {
  //   e.preventDefault();
  //   e.target.closest("div").style.border = "1px solid #DDDDDD";
  //   e.target.closest("div").style.color = "#BBBBBB";
  // };
  // const dropHandler = (e, index) => {
  //   e.preventDefault();

  //   console.log("index: ", index);
  // };

  return (
    <div className={style.points}>
      {points.map((point, index) => (
        <Point
          pointInfo={point}
          deletePoint={deletePoint}
          key={point.id}
          // index={index}
          // dragStartHandler={dragStartHandler}
          // dragEndHandler={dragEndHandler}
          // dragOverHandler={dragOverHandler}
          // dropHandler={dropHandler}
        />
      ))}
    </div>
  );
};

export default Points;
