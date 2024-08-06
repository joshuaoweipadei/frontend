import React from 'react'
import { accountServices } from '../_services'
import Header from '../Components/Header';
import News from '../Components/News';

const Home = () => {
  const account = accountServices.accountValue;

  return (
    <div>
      <Header />
      <div className='px-4'>
        <h4 className='mt-3'><span className='text-capitalize'>Welcome: {account.fullname} {" "}</span></h4>

        <div>
          <News />
        </div>
      </div>

    </div>
  )
}

export default Home