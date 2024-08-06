import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { accountServices } from '../_services';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { 
    weekday: 'long', year: 'numeric', month: 'long', 
    day: 'numeric', hour: '2-digit', minute: '2-digit', 
    second: '2-digit', hour12: true 
  };
  return date.toLocaleDateString('en-US', options);
};

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    accountServices.news().then((res) => {
      console.log(res)
      setNews(res);
    }).catch((err) => {
      console.log(err)
    });
  }, []);
  
  return (
    <div>
      <div className='bg-danger px-3 py-1 rounded-1 mt-3'>
        <h4 className='m-0 text-underlined text-white'>Trending News about Sports</h4>
      </div>

      <div className='mt-3'>
        <div className='row'>
          {news.length > 0 ? (
            <>
              {news && news.map((data, index) => (
                <div className='col-md-3 mb-3' key={index}>
                  <div className='news-card'>
                    <Link to={data.url}>
                      <div className='img-card'>
                        <img src={data.thumbnail} alt={index} />
                      </div>
                    </Link>
                    <div className='text-box'>
                      <h5><Link to={data.url}>{"data.title"}</Link> </h5>
                      <small>Date: {formatDate(data.date)}</small>
                      <div className='py-2'>
                        {data.keywords && data.keywords.length > 0 && (
                          data.keywords.map((x, i) => (
                            <span class="badge bg-light text-dark mx-1 mb-1" key={i}>{x}</span>
                          ))
                        )}
                      </div>
                      <p>{data.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className='text-center py-5'>
              <p>No data found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default News