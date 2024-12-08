import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createTodo } from "../../features/todos/todosThunk";
import Button from "../Button";
import './index.css'


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Неверный формат почты")
    .required("Электронная почта обязательна"),
  username: yup
    .string()
    .min(4)
    .max(20)
    .required("Имя пользователя обязательно"),
  text: yup
    .string()
    .min(1)
});

const CreateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: yupResolver(schema) });

  const handleCreateTodo = (data) => {
    dispatch(createTodo({ ...data }))
      .unwrap()
      .then((value) => {
        console.log("--passed", value);
        navigate('/')
      })
      .catch((err) => {
        console.log("--failed", err);
        const { status, response: { data: { message } } } = err
        handleErrorStatus(status, message)
      })
  };

  const handleErrorStatus = (status, message) => {
    switch (status) {
      case 422:
        Object.keys(message.errors).forEach((field) => {
          let err = message.errors[field].toString()
          setError(field, { type: "manual", message: err });
        })
        break;
    }
  };

  return (
    <div >
      <form className="createform-container" onSubmit={handleSubmit(handleCreateTodo)}>
        <div className="createform-email">
          <input
            type="email"
            {...register("email")}
            autoComplete="email"
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="createform-username">
          <input
            type="text"
            {...register("username")}
            placeholder="Имя пользователя"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className="createform-text">
          <textarea
            {...register("text")}
          />
          {errors.text && <p>{errors.text.message}</p>}
        </div>

        <Button type='submit' name='Create Todo' className='createform-btn' />
      </form>
    </div>
  )
};

export default CreateForm;