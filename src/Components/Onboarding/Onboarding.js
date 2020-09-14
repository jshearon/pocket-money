import React from 'react';
import utils from '../../helpers/utils';

import './Onboarding.scss';

const Onboarding = (props) => (
      <div className="Onboarding">
        <p>{utils.firstName(props.guid.displayName)}</p>
        <img className="faceThumb" src={props.guid.photoURL} alt="Face Thumbnail" />
      </div>
);

export default Onboarding;
