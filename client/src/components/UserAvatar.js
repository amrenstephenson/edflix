import React from 'react';
import { Avatar } from 'antd';
import { serverURL } from '../index';

function getInitials(name) {
  const nameComponents = name.split(' ');
  var initials = nameComponents[0].charAt(0);
  if (nameComponents.length > 1) {
    initials += nameComponents[nameComponents.length - 1].charAt(0);
  }
  return initials.toUpperCase();
}

export function UserAvatar(props) {
  const { user, size, style } = props;

  return (
    <div className="user-avatar" style={{ display: 'inline-block' }}>
      {(user && user.ProfilePicture ?
        <Avatar size={size} src={`${serverURL}/${user.ProfilePicture}`} style={{...style, backgroundColor: 'rgb(208, 0, 34)'}} /> :
        <Avatar size={size} style={{...style, userSelect: 'none', backgroundColor: 'rgb(208, 0, 34)'}}>{getInitials(user.User_name)}</Avatar>)}
    </div>
  );
}
