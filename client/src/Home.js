import ArtifactBanner from './components/ArtifactBanner';
import ArtifactRows from './components/ArtifactRows';
import NavBar from './components/NavBar';
import ArtifactPopup from './components/popup/ArtifactPopup';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
	const [params,] = useSearchParams();
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main className="container-fluid">
                <ArtifactBanner />
                <div style={{ padding: '2rem', paddingTop: '3rem' }}>
                    <ArtifactRows />
                </div>
            </main>
            {params.has('artifact') && params.has('topic') && <ArtifactPopup artifactID={params.get('artifact')} topic={params.get('topic')} />}
        </div>
    );
}
