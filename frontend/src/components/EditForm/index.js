import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { updateTodo } from '../../features/todos/todosThunk';
import { clearUserData } from '../../features/auth/authSlice';
import Button from "../Button";
import './index.css'


const schema = yup.object().shape({
  status: yup
    .mixed()
    .oneOf(["active", "finished"])
    .required("Статус обязателен"),
  text: yup
    .string()
});

export const EditForm = ({ defaultData, todoId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, setError, } = useForm({ defaultValues: defaultData, resolver: yupResolver(schema) });

  const handlePatchTodo = (data) => {
    dispatch(updateTodo({ todoId, data }))
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
      case 401:
      case 403:
        dispatch(clearUserData());
        navigate('/login');
        break;
      case 404:
        console.log('redirect')
        navigate('*');
        break;
    }
  };

  return (
    <div >
      <form className='editform-container' onSubmit={handleSubmit(handlePatchTodo)}>
        <div className='editform-select'>
          <select {...register("status")}>
            <option value="active">Активно</option>
            <option value="finished">Завершено</option>
          </select>
          {errors.status && <p>{errors.status.message}</p>}
        </div>

        <div className='editform-text'>
          <textarea
            {...register("text")}
          />
          {errors.text && <p>{errors.text.message}</p>}
        </div>

        <Button type='submit' name='edit' className='edit-btn' />
      </form>
    </div>
  );
};

export default EditForm
