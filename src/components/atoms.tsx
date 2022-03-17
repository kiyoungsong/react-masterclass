import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}


export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

// atom을 변형시켜 리턴
// atom이 변형되면 자동으로 selector도 변형됨
export const toDoSelector = selector({
  key: "toDoSelector",
  // get을 통해서 atom을 구독하고있음
  get: ({get}) => {
    // 여기서 리턴된 값이 output이됨
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  }
})
