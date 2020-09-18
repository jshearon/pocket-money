import React from 'react';
import './FamilyThumbnail.scss';
import blankUser from '../../Assets/Images/blankUser.svg';
import utils from '../../helpers/utils';

const FamilyThumbnails = (props) => (
  <div className="d-flex flex-column justify-content-between text-center">
    <img className="addBlankUser" src={props.member.photoURL ? props.member.photoURL : blankUser} alt="Face" id={props.member.id} />
    <h5>{props.member.name ? utils.firstName(props.member.name) : `${props.member.email.substring(0, 6)}...`}</h5>
  </div>);

export default FamilyThumbnails;
