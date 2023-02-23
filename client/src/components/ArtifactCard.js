import './ArtifactCard.css';
import { useSearchParams } from 'react-router-dom';

function ArtifactCard(props) {
  const [searchBarParams, setSearchBarParams] = useSearchParams();
  return (
    <div
      style={{ borderRadius: '2rem', cursor: 'pointer', background: `url("${props.artifact.ThumbnailURL}")`, backgroundSize: 'cover', border: '1px solid #ddd', textShadow: '0px 0px 2px black', ...props.style }}
      className="box artifact-card"
      onClick={() => {
        searchBarParams.set('artifact', props.artifact.Artifact_id);
        searchBarParams.set('topic', props.artifact.Topic);
        setSearchBarParams(searchBarParams);
      }}
    >
      <div style={{ borderRadius: '2rem', background: '#00000044', width: '100%', height: '100%', padding: '1rem' }}>
        <b>{props.artifact.Artifact_Name}</b>
      </div>
    </div>
  );
}

export default ArtifactCard;
