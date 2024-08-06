import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { accountServices } from '../_services';

const isNumberRegx = /\d/;
const isUpperCaseRegx = /[A-Z]/;
const isLowerCaseRegx = /[a-z]/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

const Register = () => {
  const { handleSubmit, register, getValues, formState, setError, clearErrors, reset } = useForm();
  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    upperCase: null,
    lowerCase: null,
    number: null,
    specialChar: null
  });

  const handleSetPassword = (password) => {
    setPassword(password);
    setPasswordValidity({
      minChar: password.length >= 8 ? true : false,
      upperCase: isUpperCaseRegx.test(password) ? true : false,
      lowerCase: isLowerCaseRegx.test(password) ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false
    });
  }

  const onSubmit = (values) => {
    setErrorMessage("");
    clearErrors("password");
    if(password !== ""){
      const passwordValid = Object.values(passwordValidity).every(item => item);
      if(passwordValid) {
        setIsLoading(true);
        accountServices.register({ ...values, password }).then(res => {
          setPasswordValidity({ minChar: null, upperCase: null, lowerCase: null, number: null, specialChar: null });
          setPassword("");
          reset();
          setIsLoading(false);
          alert(`${res.message}`);
        }).catch(err => {
          setErrorMessage(err);
          setIsLoading(false);
        });
      } else {
        setError("password", {
          type: "manual",
          message: 'Password must be at least 8 characters including one lowercase, uppercase, number and special character'
        });
      }
    } else {
      setErrorMessage("Please, enter password");
    }
  }

  return (
    <div className='login-auth'>
      <div className='login-container'>
        <h3 className="login-title text-center mb-5">Register an Account</h3>
          <div className="login-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">Enter Fullname</label>
                <input type="text" className="form-control" id="fullname" placeholder="Enter Fullname"
                  {...register("fullname", {
                    required: "Fullname is required",
                    pattern: {
                        value: /^[A-Za-z ]+$/i,
                        message: "Invalid character"
                    },
                    minLength: {
                      value: 2,
                      message: "Minimum character of 2"
                    },
                    maxLength: {
                      value: 25,
                      message: "Maximum character of 25"
                    }
                  })}
                />
                <small className="text-danger">{errors.fullname && errors.fullname.message}</small>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
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
                  value={password}
                  onChange={(e) => handleSetPassword(e.target.value)}
                />
                <small className="text-danger">{errors.password && errors.password.message}</small>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Verify Password</label>
                <input type="text" className="form-control" id="confirmPassword" placeholder="Verify Password"
                  {...register("confirmPassword", {
                    validate: {
                      vPassword: value => (value === getValues().password) || "Passwords do not match"
                    }
                  })}
                />
                <small className="text-danger">{errors.confirmPassword && errors.confirmPassword.message}</small>
              </div>

              <div className="d-grid gap-2 mb-3">
                <button type="submit" className="btn btn-primary">
                  {isLoading ? (
                    <div className="spinner-border spinner-border-sm text-white" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : " Register"}
                </button>
              </div>

              <p className="">Already have an account? <Link to="/" className="link">Login</Link></p>
            </form>

            {errorMessage && (<div className="small text-center text-danger mt-3">{errorMessage}</div>)}
          </div>
      </div>
    </div>
  )
}

export default Register