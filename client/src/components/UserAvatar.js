import { Avatar } from "antd";

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
        <Avatar size={size} src={user.ProfilePicture} style={{...style}} /> :
        <Avatar size={size} style={{...style}}>{getInitials(user.User_name)}</Avatar>)}
    </div>
  );
}
