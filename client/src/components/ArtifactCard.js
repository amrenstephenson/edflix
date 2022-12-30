function ArtifactCard(props) {
    return (
        <div {...props} style={{ borderRadius: '2rem', backgroundColor: '#700', ...props.style }}>
            <img src="images/testing/artifiact-image.png" alt="artifact testing" style={{ opacity: 0.8, width: '100%' }} />
        </div>
    );
}

export default ArtifactCard;
