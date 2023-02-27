import React, { Component } from 'react';
import './ArtifactPopup.css';

import { Rate } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { serverURL } from '../../index';
import { PopupLoadingIndicator } from './PopupLoadingIndicator';

import { PopupRatings } from './PopupRatings';

import { Button } from '../Button';
import ArtifactRow from '../ArtifactRow';

// TODO: Change this before production, or deal with artifacts with no link in some other way.
const defaultArtifactLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

class ArtifactPopup extends Component {
    static currentlyOpenPopup = null;

    constructor(props) {
        super(props);
        this.state = { details: null, globalRatings: null, recommendations: null };
    }

    async componentDidMount() {
        ArtifactPopup.currentlyOpenPopup = this;
        await this.setArtifact(this.props.artifactID, this.props.topic);
    }

    async setArtifact(artifactID, topic) {
        document.getElementById('artifact-popup').scroll(0, 0);
        this.setState({ details: null, userRatings: null, recommendations: null });
        await Promise.all([this.fetchData(), this.fetchUserRating(), this.fetchGlobalRatings(), this.fetchRecommendations()]);
    }

    fetchData = async () => {
        const response = await fetch(`${serverURL}/api/artifact/${this.props.artifactID}`);
        const details = await response.json();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.details = details;
        this.setState(this.state);
    };

    fetchUserRating = async () => {
        const response = await fetch(`${serverURL}/api/ratings/get/${this.props.artifactID}`);
        const { rating = null } = await response.json();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.rating = { value: rating };
        this.setState(this.state);
    };

    fetchGlobalRatings = async () => {
        const response = await fetch(`${serverURL}/api/ratings/global/${this.props.artifactID}`);
        const globalRatings = await response.json();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.globalRatings = globalRatings;
        this.setState(this.state);
    };

    fetchRecommendations = async () => {
        const response = await fetch(`${serverURL}/api/artifacts/${encodeURIComponent(this.props.topic)}`);
        const recommendations = await response.json();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.recommendations = recommendations;
        this.setState(this.state);
    };

    async onRatingChanged(value) {
        let res = null;
        if (value) {
            res = await fetch(`${serverURL}/api/ratings/set`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ artifactID: this.props.artifactID, value: value }),
            });
        } else {
            res = await fetch(`${serverURL}/api/ratings/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ artifactID: this.props.artifactID }),
            });
        }
        const data = await res.json();
        const messageID = (this.state.rating?.messageID ?? 0) + 1;
        if (data.success) {
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.rating = {
                value: value,
                message: 'Rating updated.',
                messageID: messageID,
                success: true,
            };
            this.setState(this.state);
            this.fetchGlobalRatings();
        } else if (!data.isLoggedIn) {
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.rating = {
                value: undefined,
                message: 'Please login to leave or remove a rating.',
                messageID: messageID,
                success: false,
            };
            this.setState(this.state);
        } else {
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.rating = {
                value: undefined,
                message: 'Unknown error, please try again.',
                messageID: messageID,
                success: false,
            };
            this.setState(this.state);
        }
        setTimeout(() => {
            // Only close the message if the same message is still showing.
            if (this.state.rating?.messageID === messageID) {
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.rating.message = null;
                this.setState(this.state);
            }
        }, 1000);
    }

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
                                        <a href={this.state.details.ArtifactURL ?? defaultArtifactLink} target="_blank" rel="noreferrer" draggable={false} style={{ width: '100%' }}>
                                            <Button style={{ width: '100%' }}>Go to {new URL(this.state.details.ArtifactURL ?? defaultArtifactLink).hostname}</Button>
                                        </a>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <b style={{ fontSize: 20 }}>Your Rating</b>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        {this.state.rating !== undefined ? (
                                            <>
                                                <Rate
                                                    style={{ margin: '5px 0' }}
                                                    value={this.state.rating?.value}
                                                    onChange={(value) => this.onRatingChanged(value)}
                                                />
                                                <div style={{ height: 40 }}>{this.state.rating?.message && <div className={this.state.rating.success ? 'rating-alert-success' : 'rating-alert-error'}>{this.state.rating.message}</div>}</div>
                                            </>
                                        ) : (
                                            <PopupLoadingIndicator />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Ratings Brekdown */}
                            <PopupRatings rating={this.state.globalRatings} />

                            {/* Recommendations */}
                            <div className="popup-content-recommendation">
                                <hr />
                                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 20 }}>
                                    <b style={{ fontSize: 20 }}>Similar Recommendations</b>
                                </div>
                                {this.state.recommendations ? this.state.recommendations.length !== 0 ? <ArtifactRow artifacts={this.state.recommendations} /> : <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}>There are no similar recommendations for this artifact.</div> : <PopupLoadingIndicator />}
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
