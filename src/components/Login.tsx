import { isAxiosError } from 'axios';
import useSpinner from 'hooks/useSpinner';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CommonResponseDto } from 'types';
import customAxios from 'utils/customAxios';

interface IFormInput {
  username: String;
  password: String;
}

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const { Spinner, register: registerSpinner, setShow } = useSpinner(false);
  const login: SubmitHandler<IFormInput> = async (e) => {
    setShow(true);
    try {
      await customAxios.post<CommonResponseDto>('/login', {
        ...e,
      });
      navigate('/ballsort');
      toast.success('로그인 되었습니다.');
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data?.message || e.message);
        return;
      }
      console.log(e);
    } finally {
      setShow(false);
    }
  };
  return (
    <div>
      <label>LogIn</label>
      <form onSubmit={handleSubmit(login)}>
        <div>
          <input
            {...register('username', { required: true, maxLength: 20 })}
            placeholder="username"
            id="username"
            onChange={(e) => setValue('username', e.target.value)}
          ></input>
        </div>
        <div>
          <input
            {...register('password', { required: true })}
            placeholder="password"
            type="password"
            onChange={(e) => setValue('password', e.target.value)}
          ></input>
        </div>
        <button type="submit">로그인</button>
      </form>
      <button onClick={() => navigate('/signup')}>가입하러 가기</button>
      <Spinner {...registerSpinner} />
    </div>
  );
};

export default Login;
