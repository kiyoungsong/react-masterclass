import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DragabbleCard";

const Warpper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`

interface IAera {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAera>`
  background-color: ${(props) => (props.isDraggingOver ? "#defe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent")};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
  padding: 20px;
`;

interface IBoard {
  toDos: string[];
  boardId: string;
}

function Board({toDos, boardId}: IBoard) {
  return (
    // Droppable 자식은 무조건 함수여야한다
    <Warpper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {/* 아이템이 밖으로 나갔을때 창이 작아지지 않도록 방지 */}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Warpper>
  );
}

export default Board;