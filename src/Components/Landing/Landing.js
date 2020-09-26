import React from 'react';
import Auth from '../Auth/Auth';

import piggy2 from '../../Assets/Images/piggy2.svg';
import './Landing.scss';

const Landing = (props) => (<div className="Landing d-flex flex-column justify-content-around">
        <h2>Pocket</h2>
        <h2>Piggy</h2>
        <img src={piggy2} className="logo align-self-center" alt="Logo" />
          <Auth authed={props.authed} className="align-self-end" />
      </div>);

export default Landing;
