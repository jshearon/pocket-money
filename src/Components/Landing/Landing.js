import React from 'react';
import Auth from '../Auth/Auth';

import piggy2 from '../../Assets/Images/piggy2.svg';
import './Landing.scss';

const Landing = (props) => (<div className="Landing d-flex flex-column justify-content-around align-items-center">
        <h2>Pocket Piggy</h2>
        <img src={piggy2} className="logo" alt="Logo" />
        <Auth authed={props.authed} />
      </div>);

export default Landing;
