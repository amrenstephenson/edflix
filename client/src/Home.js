import ArtifactBanner from './components/ArtifactBanner';
import ArtifactRow from './components/ArtifactRow';
import NavBar from './components/NavBar';

export default function Home() {
	return (
		<div>
			<header>
				<NavBar />
			</header>
			<main>
				<ArtifactBanner />
				<div style={{ padding: '2rem', paddingTop: '3rem' }}>
					<ArtifactRow title='Personalised Recommendations' />
					<ArtifactRow title='Trending' />
					<ArtifactRow title='IBM Z' />
					<ArtifactRow title='IBM Cloud' />
					<ArtifactRow title='Engineering' />
				</div>
			</main>
		</div>
	);
}
