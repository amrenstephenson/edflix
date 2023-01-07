import ArtifactBanner from './components/ArtifactBanner';
import ArtifactRow from './components/ArtifactRow';
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
					<ArtifactRow title='Artificial Intelligence' />
					<ArtifactRow title='Capstone' />
					<ArtifactRow title='Data Science' />
					<ArtifactRow title='IBM Automation' />
					<ArtifactRow title='IBM Cloud' />
					<ArtifactRow title='IBM Engineering' />
					<ArtifactRow title='IBM Security' />
					<ArtifactRow title='IBM Z' />
					<ArtifactRow title='Power Systems' />
					<ArtifactRow title='Red Hat Academy' />
					<ArtifactRow title='IBM Quantum' />
					{/*<ArtifactRow title='Personalised Recommendations' />
					<ArtifactRow title='Trending' />
					<ArtifactRow title='Engineering' />*/}
				</div>
			</main>
		</div>
	);
}
