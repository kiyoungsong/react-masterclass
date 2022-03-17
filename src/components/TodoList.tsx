import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, IToDo, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // 배열안의 배열선택
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  }
  console.log(category)
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TODO}>To do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

/*
 * react-hook-form 적용
 */
interface IHookForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

export function ToDoListReactHookForm() {
  // register가 있으면 onChange항수가 필요없음
  // watch은 변경을 주시함
  // handleSubmit => defaultPrevent, Validation담당
  // formState 에러를 표시함
  // setError 특정 에러를 발생시킴
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IHookForm>({
    defaultValues: {
      email: "@naver.com", // 이렇게 기본값을 지정해 줄수도 있다.
    },
  });

  const onValid = (data: any) => {
    if (data.password !== data.password1) {
      return setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // 특정한 요소가 아닌 form전체 요소에 대한 에러임
    setError("extraError", { message: "Server Offline" });
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/, // 정규식적용
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", { required: "firstName is required" })}
          // 혹은 reuired: true 이런식으로 전달 가능
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "lastName is required" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", {
            required: "username is required",
            // 객체를 이용해 여러개도 가능
            validate: {
              noNico: (value) => !value.includes("nico") || "no nico allowed!",
              noNick: (value) => !value.includes("nick") || "no nick allowed!",
            },
            minLength: {
              value: 3,
              message: "username length should be over 3",
            },
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 5,
              message: "Password length should be over 5",
            },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "password is required",
            minLength: {
              value: 5,
              message: "Password length should be over 5",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
