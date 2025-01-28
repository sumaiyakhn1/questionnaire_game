import React from 'react'
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";




export default function Navbar(props) {
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
 
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li>
        <h3>KON BANEGA CODER</h3>
        </li>
        {/* <li className="nav-item">
          
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li> */}
       
   
       
      </ul>
      {/* <form className="d-flex" role="search"> */}
        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
        <a className="nav-link active" aria-current="page" href="/">Home..</a>
      {/* </form>  */}
      
    </nav>
    </div>

 
  )
}

// setting data type for navbar
// Navbar.propTypes = {
//     title: PropTypes.string.isRequired, //compulsory else error
//     aboutText: PropTypes.string
// }

// setting default value for navbar
// Navbar.defaultProps = {
//     title: 'set title here',
//     aboutText: 'about'
// };