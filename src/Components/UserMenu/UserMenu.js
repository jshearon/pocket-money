import React from 'react';
import Auth from '../Auth/Auth';
import './UserMenu.scss';

const UserMenu = (props) => ( 
    <div className="UserMenu">
      <Auth authed={props.authed} />
    </div>
);

export default UserMenu;
