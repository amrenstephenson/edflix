function ArtifactBanner(props) {
    return (

        <div
            style={{
                backgroundImage: 'linear-gradient(0, black, transparent), url("images/testing/banner.png")',
                backgroundSize: '100%',
                height: '20rem',
                width: '100%',
                marginBottom: "-10rem"
            }}
            alt="Test banner"
        />

    )
}

export default ArtifactBanner;