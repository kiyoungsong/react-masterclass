import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";


function ToDo({text, category, id}: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  // 타입스크립트 팁 newCategory: IToDo["category"]
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newTodo = { text, id, category: name as Categories };
      
      return [...oldToDos.slice(0, targetIndex), newTodo, ...oldToDos.slice(targetIndex + 1)];
    })
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TODO && (
        <button name={Categories.TODO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;