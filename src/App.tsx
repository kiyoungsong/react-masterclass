import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './components/atoms';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // 유저가 Drag를 끝낸 시점에 불려지는 함수
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        // 1. 원래 위치에 있는 아이템을 삭제하고
        boardCopy.splice(source.index, 1);
        // 2. 드래그 위치에 넣어줌
        boardCopy.splice(destination?.index, 0, draggableId);
        return { 
          ...allBoards, 
          [source.droppableId]: boardCopy
         };
      })
    } else {
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const targetBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, draggableId);
        
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        }
      })
    }
    
  }

  return (
    // 드래그 드롭할 영역에 지정해줌
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
