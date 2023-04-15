import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDto } from 'types';
import customAxios from 'utils/customAxios';
import { toast } from 'react-hot-toast';

interface IFormInput {
  firstName: String;
  lastName: String;
  username: String;
  password: String;
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  }>({ firstName: '', lastName: '', username: '', password: '' });
  const signUp: SubmitHandler<IFormInput> = async (e) => {
    try {
      await customAxios.post<UserDto>('/signup', {
        ...e,
      });
      toast.success('가입되었습니다.');
      navigate('/');
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data?.message || e.message);
        return;
      }
      console.error(e);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(signUp)}>
        <label>Sign Up</label>
        <div>
          <input
            {...register('firstName', { required: true, maxLength: 20 })}
            placeholder="firstName"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          ></input>
        </div>
        <div>
          <input
            {...register('lastName', { required: true })}
            placeholder="lastName"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          ></input>
        </div>
        <div>
          <input
            {...register('username', { required: true, maxLength: 20 })}
            placeholder="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          ></input>
        </div>
        <div>
          <input
            {...register('password', { required: true })}
            placeholder="password"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          ></input>
        </div>
        <input type="submit" value="가입"></input>
      </form>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
};

export default SignUp;
