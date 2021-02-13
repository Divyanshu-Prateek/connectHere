import React from 'react'
import '../../static/css/Error404.css';
import errorMeme from '../../static/images/error404Meme.jpg';
import  {Link,}from 'react-router-dom';

const Error404 = () => {
  return (
    <div className='container text-center'>
         <section className="page_404">
            <div className="container">
              <div className="row">	
                <div className="col-sm-12 ">
                  <div className="col-sm-10 col-sm-offset-1  text-center">
                    <div className="four_zero_four_bg">
                      <h1 className="text-center ">
                        Error 404!
                      </h1>
                    </div>
                    <div className="contant_box_404">
                      <h2 className="h2">
                        <p>Look like you're lost </p>
                        <p>the page you are looking for not available!</p>
                        <p>So here is a meme instead - </p>
                      </h2>
                      <img src={errorMeme} width="100" height="500"></img>
                      <h2>Now, lets go back to home ;)</h2>
                      <Link to='/' className='link_404'>Go to Home</Link>
                    </div>
                  </div>
                </div>
              </div>
           </div>
          </section>
      </div>
  )
}

export default Error404


