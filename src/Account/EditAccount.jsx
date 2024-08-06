import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Header from '../Components/Header'
import { accountServices } from '../_services';

const EditAccount = () => {
  const account = accountServices.accountValue;
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values) => {
    setIsLoading(true);
    accountServices.updateUser(account.id, values).then(({ message }) => {
      setErrorMessage(message)
      setIsLoading(false);
    }).catch(err => {
      setErrorMessage(err)
      setIsLoading(false);
    });
  }

  return (
    <div>
      <Header />
      <div className='px-4'>
        <h4 className='mt-3'><span className='text-capitalize'>Edit Account</span></h4>
        <div className='px-5 mt-3'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">Enter Fullname</label>
              <input type="text" className="form-control" id="fullname" placeholder="Enter Fullname" defaultValue={account.fullname}
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
                <input type="email" className="form-control" id="email" placeholder="Enter Email" defaultValue={account.email}
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

            <div className="d-grid gap-2 mb-3">
              <button type="submit" className="btn btn-primary">
                {isLoading ? (
                  <div className="spinner-border spinner-border-sm text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : " Submit"}
              </button>
            </div>
          </form>

          {errorMessage && (<div className="small text-center text-danger mt-3">{errorMessage}</div>)}
        </div>
      </div>
    </div>
  )
}

export default EditAccount