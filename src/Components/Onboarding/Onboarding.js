import React from 'react';
import Auth from '../Auth/Auth';

import './Onboarding.scss';

const Onboarding = (props) => (
      <div className="Onboarding">
        <h2>Onboarding Form</h2>
        <Auth authed={props.authed} />
      </div>
);

export default Onboarding;
