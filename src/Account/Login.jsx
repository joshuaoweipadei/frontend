import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { accountServices } from '../_services';

const Login = () => {
  const { handleSubmit, register, setValue, formState } = useForm();
  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (values) => {
    setErrorMessage("");
    setIsLoading(true);
    accountServices.login(values).then((res) => {
      console.log(res);
      setIsLoading(false);
      // redirect has already happen
    }).catch(err => {
      setErrorMessage(err)
      setValue("password", "");
      setIsLoading(false);
    })
  }

  return (
    <div className='login-auth'>
      <div className='login-container'>
        <h3 className="login-title text-center mb-5">Welcome back, Login</h3>
        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Enter Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              <small className="text-danger">{errors.email && errors.email.message}</small>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="text" className="form-control" id="password" placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <small className="text-danger">{errors.password && errors.password.message}</small>
            </div>

            <div className="d-grid gap-2 mb-3">
              <button type="submit" className="btn btn-primary">
                {isLoading ? (
                  <div className="spinner-border spinner-border-sm text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : " Login"}
              </button>
            </div>

            <p>New here? <Link to="/register" className="link">Register now</Link></p>
          </form>

          {errorMessage && (<div className="small text-center text-danger mt-3">{errorMessage}</div>)}

        </div>
      </div>
    </div>
  )
}

export default Login