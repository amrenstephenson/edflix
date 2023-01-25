function ArtifactCard(props) {
    return (
        <div style={{ borderRadius: '2rem', background: `url("${props.artifact.ThumbnailURL}")`, backgroundSize: 'cover', backgroundPosition: 'center', border: '0.5px solid white', ...props.style }}>
            <div style={{borderRadius: '2rem', background: '#00000044', width: '100%', height: '100%', padding: '1rem'}}>
                <b>{props.artifact.Artifact_Name}</b>
            </div>
        </div>
    );
}

export default ArtifactCard;
