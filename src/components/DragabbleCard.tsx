import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${(props) => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

interface IDraggable {
  toDo: string;
  index: number
}

function DraggableCard({ toDo, index }: IDraggable) {
  return (
    // key와 draggableId는 무조건 같아야함
    <Draggable draggableId={toDo} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);