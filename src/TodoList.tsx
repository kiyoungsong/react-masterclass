import React, { useState } from "react";
import { useForm } from 'react-hook-form';

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

function ToDoList() {
  // register가 있으면 onChange항수가 필요없음
  // watch은 변경을 주시함
  // handleSubmit => defaultPrevent, Validation담당
  // formState 에러를 표시함
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm <IForm>({
    defaultValues: {
      email: '@naver.com' // 이렇게 기본값을 지정해 줄수도 있다.
    }
  });

  const onValid = (data: any) => {
    console.log(data);
  }
  
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
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", { required: "firstName is required" })}
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
        <button>Add</button>
      </form>
    </div>
  );

  // react Form을 통해 밑의 주석 코드는 필요없어짐
  // const [toDo, setToDo] = useState('');

  // const onChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   const { currentTarget: { value } } = e;
  //   setToDo(value);
  // };

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(toDo);
  // }

  // return (
  //   <div>
  //     <form onSubmit={onSubmit}>
  //       <input value={toDo} onChange={onChange} placeholder="Write a to do" />
  //       <button>Add</button>
  //     </form>
  //   </div>
  // );
}

export default ToDoList;