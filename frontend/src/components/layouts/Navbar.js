import React from 'react'
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const Navbar = ({getAllMemes}) => {
  return (
    <nav className="bg-primary navbar">
      <h1 style={{fontSize: '2.25rem'}}>
        Xmeme
      </h1>
      <ul>
        <li>
          <Link to="/" style={{fontSize: '1.25rem'}}>Home</Link>
        </li>
        <li onClick={getAllMemes}>
          <Link to='/memes' style={{fontSize:'1.25rem'}}>Memes</Link>
        </li>
        <li>
          <Link to="/about" style={{fontSize: '1.25rem'}}>About</Link>
        </li>
        <li>
          <a href="https://xmeme-prateek-divyanshu.herokuapp.com/swagger-ui/">
          <Button variant="success">Swagger</Button>
          </a>
        </li>
        
      </ul>
    </nav>
  )
}

export default Navbar
