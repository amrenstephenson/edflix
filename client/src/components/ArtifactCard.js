import { useEffect, useState } from "react";
import HomePopupView from './popup/popup';
function ArtifactCard (props) {
  const [is_show_popup, setIs_show_popup] = useState(false);
  const closePopup = (data) => {
    console.log(data)
    setIs_show_popup(false)
  }
    return (
      <div style={{ borderRadius: '2rem', background: `url("${props.artifact.ThumbnailURL}")`, backgroundSize: 'cover', border: '0.5px solid white', ...props.style }} className="box" onClick={(e) => {
        setIs_show_popup(true)

      }}>
            <div style={{borderRadius: '2rem', background: '#00000044', width: '100%', height: '100%', padding: '1rem'}}>
                <b>{props.artifact.Artifact_Name}</b>
            </div>
          {is_show_popup===true ? <HomePopupView closePopup={closePopup} /> : ''}
        </div>
    );
}

export default ArtifactCard;
