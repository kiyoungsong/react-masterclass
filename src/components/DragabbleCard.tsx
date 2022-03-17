import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 10px;
`;

interface IDraggable {
  toDo: string;
  index: number
}

function DraggableCard({ toDo, index }: IDraggable) {
  return (
    // key와 draggableId는 무조건 같아야함
    <Draggable draggableId={toDo} index={index}>
      {(provided) => (
        <Card
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