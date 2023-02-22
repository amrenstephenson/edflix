import ArtifactRow from "./ArtifactRow";
import { useEffect, useState } from "react";
import { serverURL } from '../index';

function ArtifactRows(props) {
    const [artifactRows, setArtifactRows] = useState([]);
    useEffect(() => {
            // Create an array of topics and their associated artifacts from the array of artifacts.
        const fetchData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const [response1, response2] = await Promise.all([fetch(`${serverURL}/api/artifacts?filter=${searchParams.get('filter') ?? ''}`), fetch(`${serverURL}/api/recommendations`)]);
            const [artifacts, recommendations] = await Promise.all([response1.json(), response2.json()]);
        
            // Create an array of topics and their associated artifacts from the array of artifacts.
            const groupedArtifacts = []

            if (recommendations && recommendations.length > 0) {
                groupedArtifacts.push({'topic': 'Recommendations', 'artifacts': recommendations});
            }
            
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
            .catch(console.error);
    }, [])

    return (
        <div {...props} style={{ ...props.style }}>
            {artifactRows.map((artifactRow,index) => (
              <ArtifactRow key={index} index={index} title={artifactRow.topic} artifacts={artifactRow.artifacts} />
            ))}
        </div>
    );
}

export default ArtifactRows;