import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap'

const Footer = () => {
  return (
    <Fragment>
      <div className="bg-footer footer" style={{display:'grid',gridTemplateColumns:'[first] 1fr [second] 1fr [third] ',gridTemplateRows:'[firstRow] 0.5fr [secondRow] 0.5fr [thirdRow] 1fr [fourthRow]',justifyItems:'center'}}>
        <h3>
        <div style={{gridColumnStart:'first',gridColumnEnd:'second',gridRowStart:'firstRow',gridRowEnd:'secondRow'}}><Link to='/'>Home</Link></div>
        </h3>
        <h3>
        <div style={{gridColumnStart:'first',gridColumnEnd:'second',gridRowStart:'secondRow',gridRowEnd:'thirdRow'}}><Link to='/memes'>Memes</Link></div>
        </h3>
        <h3>
        <div style={{gridColumnStart:'second',gridColumnEnd:'third',gridRowStart:'firstRow',gridRowEnd:'secondRow'}}><Link to='/about'>About</Link></div>
        </h3>
        <h3>
        <div style={{gridColumnStart:'second',gridColumnEnd:'third',gridRowStart:'secondRow',gridRowEnd:'thirdRow'}}><a href="https://xmeme-prateek-divyanshu.herokuapp.com/swagger-ui/">
          Swagger
          </a></div>
        </h3>
        <div style={{gridColumnStart:'first',gridColumnEnd:'third',gridRowStart:'thirdRow',gridRowEnd:'fourthRow',textAlign: 'center'}}>
          <p><b>Xmeme ©2021</b></p>
          <p><b>All Rights Reserved by Prateek Divyanshu</b></p>
          <p>
            <a href="mailto:prateek10023@gmail.com">Contact Me</a>
            </p>
        </div>
      </div>
    </Fragment>
  )
}

export default Footer
