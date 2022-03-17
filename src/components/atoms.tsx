import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
})

export const hourSelector = selector<number>({
  key: "hours",
  get: ({get}) => {
    const minutes = get(minuteState);
    return (minutes / 60);
  },
  // atom의 set함수에 접근함
  set: ({set}, newValue) => {
    const minutes = Number(newValue) * 60
    set(minuteState, minutes);
  }
})