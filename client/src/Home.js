import ArtifactBanner from './components/ArtifactBanner';
import ArtifactRows from './components/ArtifactRows';
import NavBar from './components/NavBar';

export default function Home() {
	return (
		<div>
			<header>
				<NavBar />
			</header>
			<main className='container-fluid'>
				<ArtifactBanner />
				<div style={{ padding: '2rem', paddingTop: '3rem' }}>
					<ArtifactRows />
				</div>
			</main>
		</div>
	);
}
