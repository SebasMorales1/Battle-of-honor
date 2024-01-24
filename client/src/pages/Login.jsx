import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('nickname is required').min(3, 'nickname must be at least 3 characters').max(50, 'Nickname must be at most 50 characters'),
    password: Yup.string().required('Password is required').min(8, "Password must be at least 8 characters").max(30, "password must be at most 30 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      navigate("/home");
    },
  });

  return (
    <form className='container-login flex h-screen' onSubmit={formik.handleSubmit}>
      <div className="fields-login w-1/2 h-full bg-form bg-cover bg-no-repeat bg-center">
        <div className='container-content flex flex-col items-center justify-center m-20'>
          <h1 className='italic text-white text-5xl text-center mb-16 font-bold'>Login</h1>

          <input
            className={`mb-7 w-4/5 p-2 rounded-xl bg-white/90 placeholder:text-black ${formik.touched.name && formik.errors.name && 'border-red-500'}`}
            type="text"
            placeholder='NickName'
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}

          <input
            className={`mb-7 w-4/5 p-2 rounded-xl bg-white/90 placeholder:text-black ${formik.touched.password && formik.errors.password && 'border-red-500'}`}
            type="password"
            placeholder='Password'
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}

          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Login</button>
        </div>
      </div>
    </form>
  );
}

export default Login;
