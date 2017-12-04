import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Describes the Login component
 * **/

class Login extends React.Component {
  render() {
    return (
      <div className="pharm__login">
        <Link to="patient">
          <button className="pharm__login__button pharm__login__button--patient">Login as Patient</button>
        </Link>
        <Link to="doctor">
          <button className="pharm__login__button pharm__login__button--doctor">Login as Doctor</button>
        </Link>
        <Link to="pharmacist">
          <button className="pharm__login__button pharm__login__button--pharmacist">Login as Pharmacist</button>
        </Link>
      </div>
    );
  }
}

export default Login;
