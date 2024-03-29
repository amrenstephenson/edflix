import React from 'react';

function ArtifactBanner(props) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0, black, transparent), url("${props.url ?? 'images/banner.png'}")`,
        backgroundSize: '100%',
        height: '20rem',
        width: '100%',
        marginBottom: '-10rem',
      }}
      alt="Test banner"
    />

  );
}

export default ArtifactBanner;
