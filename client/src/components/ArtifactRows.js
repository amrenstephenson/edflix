import ArtifactRow from "./ArtifactRow";
import { useEffect, useState } from "react";

function ArtifactRows(props) {
    const [artifactRows, setArtifactRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/artifacts');
            const artifacts = await response.json();
        
            // Create an array of topics and their associated artifacts from the array of artifacts.
            const groupedArtifacts = []
            
            artifacts.forEach((artifact) => {
                const topic = groupedArtifacts.find(group => group.topic === artifact.Topic)
                if (topic) {
                    topic.artifacts.push(artifact)
                } else {
                    groupedArtifacts.push({'topic':artifact.Topic, 'artifacts': [artifact]})
                }
            })
        
            setArtifactRows(groupedArtifacts);
        }
        
        fetchData()
            .catch(console.error);;
    }, [])

    return (
        <div {...props} style={{ ...props.style }}>
            {artifactRows.map((artifactRow) => (
                <ArtifactRow title={artifactRow.topic} artifacts={artifactRow.artifacts} />
            ))}
        </div>
    );
}

export default ArtifactRows;