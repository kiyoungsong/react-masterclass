import React, { useState } from "react";
import { useForm } from 'react-hook-form';

function ToDoList() {
  // register가 있으면 onChange항수가 필요없음
  // watch은 변경을 주시함
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("Email")} placeholder="Email" />
        <input {...register("FirstName")} placeholder="First Name" />
        <input {...register("LastName")} placeholder="Last Name" />
        <input {...register("Username")} placeholder="Username" />
        <input {...register("PasswordName")} placeholder="Password Name" />
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