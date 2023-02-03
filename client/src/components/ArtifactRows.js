import ArtifactRow from "./ArtifactRow";
import { useEffect, useState } from "react";
import { serverURL } from '../index';

function ArtifactRows(props) {
    const [artifactRows, setArtifactRows] = useState([]);
    console.log(props)
    useEffect(() => {
            // Create an array of topics and their associated artifacts from the array of artifacts.
        const fetchData = async () => {
            const response = await fetch(`${serverURL}/api/artifacts`);
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
            {artifactRows.map((artifactRow,index) => (
              <ArtifactRow index={index} title={artifactRow.topic} artifacts={artifactRow.artifacts} />
            ))}
        </div>
    );
}

export default ArtifactRows;