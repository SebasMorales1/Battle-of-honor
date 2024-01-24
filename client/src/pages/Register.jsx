import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nickname is required').min(3, 'nickname must be at least 3 characters').max(50, 'Nickname must be at most 50 characters'),
    email: Yup.string().email('email invalid').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(30, 'Password must be at most 30 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      navigate("/login");
    },
  });

  return (
    <form className='container-register flex h-screen' onSubmit={formik.handleSubmit}>
      <div className="fields-register w-1/2 h-full bg-form bg-cover bg-no-repeat bg-center">
        <div className='container-content flex flex-col items-center justify-center m-20'>
          <h1 className='italic text-white text-5xl text-center mb-10 font-bold'>Register</h1>
          
          <input
            className={`mb-7 w-4/5 p-2 rounded-xl bg-white/90 placeholder:text-black ${formik.touched.name && formik.errors.name && 'border-red-500'}`}
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='NickName'
          />
          {formik.touched.name && formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
          
          <input
            className={`mb-7 w-4/5 p-2 rounded-xl bg-white/90 placeholder:text-black ${formik.touched.email && formik.errors.email && 'border-red-500'}`}
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='E-mail'
          />
          {formik.touched.email && formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
          
          <input
            className={`mb-7 w-4/5 p-2 rounded-xl bg-white/90 placeholder:text-black ${formik.touched.password && formik.errors.password && 'border-red-500'}`}
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Password'
          />
          {formik.touched.password && formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}
          
          <input
            className={`mb-7 w-4/5 p-2 rounded-xl bg-white/90 placeholder:text-black ${formik.touched.confirmPassword && formik.errors.confirmPassword && 'border-red-500'}`}
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Confirm password'
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500">{formik.errors.confirmPassword}</p>}
          
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Register</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
