import { useState } from 'react';
import ArtifactPopup from './popup/ArtifactPopup';
import './ArtifactCard.css';

function ArtifactCard(props) {
    const [showPopup, setShowPopup] = useState(false);
    const closePopup = (_) => {
        setShowPopup(false);
    };
    return (
        <div
            style={{ borderRadius: '2rem', cursor: 'pointer', background: `url("${props.artifact.ThumbnailURL}")`, backgroundSize: 'cover', border: '1px solid #ddd', textShadow: '0px 0px 2px black', ...props.style }}
            className="box artifact-card"
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
