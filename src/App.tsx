import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './components/atoms';
import DraggableCard from './components/DragabbleCard';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // 유저가 Drag를 끝낸 시점에 불려지는 함수
  const onDragEnd = ({draggableId, destination, source}: DropResult) => {
    if (!destination) return;
    setToDos(oldToDos => {
      const copyToDos = [...oldToDos];
      // 1. 원래 위치에 있는 아이템을 삭제하고
      copyToDos.splice(source.index, 1);
      // 2. 드래그 위치에 넣어줌
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;;
    })
  }

  return (
    // 드래그 드롭할 영역에 지정해줌
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {/* Droppable 자식은 무조건 함수여야한다 */}
          <Droppable droppableId="one">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo} toDo={toDo} index={index}/>
                ))}
                {/* 아이템이 밖으로 나갔을때 창이 작아지지 않도록 방지 */}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
