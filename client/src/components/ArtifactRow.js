import Carousel from 'react-bootstrap/Carousel';
import ArtifactCard from './ArtifactCard';

function CarouselIcon(direction) {
    return (
        <span style={{ backgroundColor: 'black', padding: '1rem', borderRadius: '100%', display: 'flex' }}>
            <span aria-hidden="true" className={"carousel-control-" + direction + "-icon"} />
        </span>
    )
}

function ArtifactRow (props) {
    return (
      <div key={props.index}>
            <h1 style={{ color: 'white', paddingBottom: '1rem', float: 'left', fontSize: '2rem' }}>{props.title}</h1>
            <Carousel
                wrap={false}
                interval={null}
                prevIcon={CarouselIcon('prev')}
                nextIcon={CarouselIcon('next')}
                style={{ paddingBottom: '3.5rem' }}
            >
                {props.artifacts.reduce((resultArray, item, index) => { 
                    const cardsPerRow = 5
                    const rowIndex = Math.floor(index/cardsPerRow)

                    if(!resultArray[rowIndex]) {
                        resultArray[rowIndex] = [] // start a new row
                    }

                    resultArray[rowIndex].push(item)

                    return resultArray
                    }, []).map((artifacts, index) => (
                        <Carousel.Item key={index}>
                            <div style={{ display: 'flex', height: '12rem', width: '100%', gap: '1rem' }}>
                                {artifacts.map((artifact) => (
                                    <ArtifactCard style={{ flex: 1 }} artifact={artifact} />
                                ))}
                            </div>
                            {/* <Carousel.Caption>
                                <h3>{index}</h3>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                ))}
            </Carousel>
        </div >
    );
}

export default ArtifactRow;