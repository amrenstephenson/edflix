import React, { Component } from 'react';
import './ArtifactPopup.css';

import { Rate } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { serverURL } from '../../index';
import { PopupLoadingIndicator } from './PopupLoadingIndicator';

import { PopupRatings } from './PopupRatings';

import { Button } from '../Button';
import ArtifactRow from '../ArtifactRow';

class ArtifactPopup extends Component {
    static currentlyOpenPopup = null;

    constructor(props) {
        super(props);
        this.state = { details: null, rating: null, recommendations: null };
        this.initialArtifactID = props.artifactID;
        this.initialTopic = props.topic;
    }

    async componentDidMount() {
        ArtifactPopup.currentlyOpenPopup = this;
        await this.setArtifact(this.initialArtifactID, this.initialTopic);
    }

    async setArtifact(artifactID, topic) {
        document.getElementById('artifact-popup').scroll(0, 0);
        this.setState({ details: null, rating: null, recommendations: null });
        await Promise.all([
            this.fetchData(artifactID),
            this.fetchRating(artifactID),
            this.fetchRecommendations(topic),
        ]);
    }

    fetchData = async (artifactID) => {
        const response = await fetch(`${serverURL}/api/artifact/${artifactID}`);
        const details = await response.json();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.details = details;
        this.setState(this.state);
    };

    fetchRating = async (artifactID) => {
        const response = await fetch(`${serverURL}/api/ratings/get/${artifactID}`);
        const rating = await response.json();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.rating = rating;
        this.setState(this.state);
    };

    fetchRecommendations = async (topic) => {
        const response = await fetch(`${serverURL}/api/artifacts/${encodeURIComponent(topic)}`);
        const recommendations = await response.json();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.recommendations = recommendations;
        this.setState(this.state);
    };

    closePopup = (e) => {
        if (e) {
            e.stopPropagation();
        }
        this.props.closePopup(false);
        ArtifactPopup.currentlyOpenPopup = null;
    };

    render() {
        return (
            <div id="artifact-popup" className="popup-container fixed" onClick={this.closePopup}>
                {this.state.details ? (
                    <span onClick={(e) => e.stopPropagation()}>
                        {/* Title and Image */}
                        <div className="popup-header">
                            <img src={this.state.details.ImageURL} style={{ aspectRatio: 4 / 2, objectFit: 'cover', backgroundColor: '#222' }} alt="" className="popup-header-img" />
                            <CloseOutlined onClick={this.closePopup} className="popup-close-btn" />
                            <div className="popup-header-title">{this.state.details.Artifact_Name}</div>
                        </div>
                        <div className="popup-content">
                            {/* Decription */}
                            <div className="popup-content-description flex" dangerouslySetInnerHTML={{ __html: this.state.details.Description }} />
                            <hr />

                            {/* Link and Submit Rating */}
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, borderRight: '2px solid #4d4d4d', alignItems: 'center', justifyContent: 'center' }}>
                                    <b style={{ fontSize: 20 }}>Start Studying</b>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <a href={this.state.details.ArtifactURL} target="_blank" rel="noreferrer" draggable={false} style={{ width: '100%' }}>
                                            <Button style={{ width: '100%' }}>Go to {new URL(this.state.details.ArtifactURL || 'about:blank').hostname}</Button>
                                        </a>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <b style={{ fontSize: 20 }}>Your Rating</b>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Rate allowClear={false} defaultValue={0} style={{ margin: '5px 0' }} />
                                        <Button>Submit</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Ratings Brekdown */}
                            <PopupRatings rating={this.state.rating} />

                            {/* Recommendations */}
                            <div className="popup-content-recommendation">
                                <hr />
                                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 20 }}>
                                    <b style={{ fontSize: 20 }}>Similar Recommendations</b>
                                </div>
                                {this.state.recommendations ? (this.state.recommendations.length !== 0 ? <ArtifactRow artifacts={this.state.recommendations} /> : <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}>There are no similar recommendations for this artifact.</div>) : <PopupLoadingIndicator />}
                            </div>
                        </div>
                    </span>
                ) : (
                    <PopupLoadingIndicator />
                )}
            </div>
        );
    }
}

export default ArtifactPopup;
