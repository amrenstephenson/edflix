import {useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ArtifactCard from './ArtifactCard';

function CarouselIcon(direction) {
    return (
        <span style={{ backgroundColor: 'black', padding: '1rem', borderRadius: '100%', display: 'flex' }}>
            <span aria-hidden="true" className={"carousel-control-" + direction + "-icon"} />
        </span>
    )
}

function ArtifactRow(props) {
    const [artifacts, setArtifacts] = useState(null);
    useEffect(() => {
        fetch("/api/artifacts")
            .then(res => res.json())
            .then(
                (result) => {
                    setArtifacts(result);
                },
            );
    }, []);

    if (artifacts) {
        let pages = [];
        let curPage = []
        for (let i = 0; i < artifacts.length; i++) {
            if (artifacts[i].Topic !== props.title)
                continue;
            curPage.push(artifacts[i]);
            if (curPage.length === 5) {
                pages.push(curPage);
                curPage = [];
            }
        }
        if (curPage.length > 0) {
            pages.push(curPage);
        }

        return (
            <div>
                <h1 style={{ color: 'white', paddingBottom: '1rem', float: 'left', fontSize: '2rem' }}>{props.title}</h1>
                <Carousel
                    wrap={false}
                    interval={null}
                    prevIcon={CarouselIcon('prev')}
                    nextIcon={CarouselIcon('next')}
                    style={{ paddingBottom: '3.5rem' }}
                >
                    {Array.from(pages).map((page, index) => (
                        <Carousel.Item key={index}>
                            <div style={{ display: 'flex', height: '12rem', width: '100%', gap: '1rem' }}>
                                {Array.from(page).map((artifact, index) => (
                                    <ArtifactCard style={{ flex: 1 }} artifact={ artifact } />
                                ))}
                            </div>
                            <Carousel.Caption>
                                <h3>{index}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div >
        );
    } else {
        return <div>No items.</div>
    }
}

export default ArtifactRow;