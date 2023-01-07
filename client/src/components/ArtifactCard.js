function ArtifactCard(props) {
    return (
        <div {...props} style={{ borderRadius: '2rem', backgroundColor: '#700', ...props.style, overflow: 'hidden' }}>
            <img src={ props.artifact.ThumbnailURL } alt="artifact testing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    );
}

export default ArtifactCard;
