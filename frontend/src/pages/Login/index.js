import { React, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { login, fetchUserData } from '../../features/auth/authThunk';
import Button from '../../components/Button';
import './index.css'


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Неверный формат почты")
    .required("Электронная почта обязательна"),
  password: yup
    .string()
    .min(3)
    .max(36)
    .required("Пароль обязателен"),
});


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: yupResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleLogin = (data) => {
    dispatch(login({ ...data }))
      .unwrap()
      .then((value) => {
        console.log("--passed", value);
        dispatch(fetchUserData())
          .unwrap()
          .then((value) => {
            console.log("fetched userdata")
            console.log(value)
          })
          .catch((err) => {
            console.log("--failed", err);
          })
        navigate('/')
      })
      .catch((err) => {
        console.log("--failed", err);
        const { status, response: { data: { message } } } = err
        handleErrorStatus(status, message)
      })
  }

  const handleErrorStatus = (status, message) => {
    switch (status) {
      case 422:
        Object.keys(message.errors).forEach((field) => {
          let err = message.errors[field].toString()
          setError(field, { type: "manual", message: err });
        })
        break;
      case 401:
        setError("email", { type: "manual", message: "Неверная почта для входа" });
        setError("password", { type: "manual", message: "Неверный пароль для входа" });
    }
  };


  return (
    <div>
      <div>
        <h2>Login</h2>
      </div>
      <div className='login-container'>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className='login-email'>
            <input
              type="email"
              {...register("email")}
              autoComplete="email"
              placeholder="Email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className='login-password'>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              autoComplete="current-password"
              placeholder="Пароль"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          {
            loading ?
              <div className="loading"><span>Loading...</span></div>
              :
              <Button type='submit' name='login' className='login-btn' />
          }
        </form>
      </div>
    </div>
  );
}


export default Login;