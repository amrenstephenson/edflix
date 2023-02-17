import { useState } from 'react';
import ArtifactPopup from './popup/ArtifactPopup';
function ArtifactCard(props) {
    const [showPopup, setShowPopup] = useState(false);
    const closePopup = (_) => {
        setShowPopup(false);
    };
    return (
        <div
            style={{ borderRadius: '2rem', background: `url("${props.artifact.ThumbnailURL}")`, backgroundSize: 'cover', border: '0.5px solid white', ...props.style }}
            className="box"
            onClick={(e) => {
                if (ArtifactPopup.currentlyOpenPopup !== null) {
                    ArtifactPopup.currentlyOpenPopup.setArtifact(props.artifact.Artifact_id, props.artifact.Topic);
                } else {
                    setShowPopup(true);
                }
            }}
        >
            <div style={{ borderRadius: '2rem', background: '#00000044', width: '100%', height: '100%', padding: '1rem' }}>
                <b>{props.artifact.Artifact_Name}</b>
            </div>
            {showPopup === true ? <ArtifactPopup closePopup={closePopup} artifactID={props.artifact.Artifact_id} topic={props.artifact.Topic} /> : ''}
        </div>
    );
}

export default ArtifactCard;
