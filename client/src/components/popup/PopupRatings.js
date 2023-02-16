import { Component } from 'react';
import { Rate, Progress } from 'antd';
import { roundDP } from '../utils';

export class PopupRatings extends Component {
    render() {
        return (
            <>
                {this.props.rating && (
                    <div className="popup-content-current-rating">
                        <div className="rating-subtitle subtitle">
                            <hr />
                            User Ratings
                        </div>
                        <div className="rating-rate">
                            {this.props.rating.average == null ? (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>This artifact has no ratings.</div>
                            ) : (
                                <>
                                    <div>
                                        <Rate disabled defaultValue={roundDP(this.props.rating.average)} />
                                        &nbsp;&nbsp;&nbsp;{roundDP(this.props.rating.average, 1)} out of 5
                                    </div>
                                    <div className="rating-tipc">
                                        {this.props.rating.counts.total} Total Rating{this.props.rating.counts.total === 1 ? '' : 's'}
                                    </div>
                                </>
                            )}
                        </div>

                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="rating-progress flex-center">
                                <span className="rating-progress-text" style={{ whiteSpace: 'nowrap' }}>
                                    {i} Star
                                </span>
                                <Progress status="normal" percent={this.props.rating.counts ? roundDP((this.props.rating.counts[i] / this.props.rating.counts.total) * 100) : 0} strokeWidth="18px" strokeColor="#f3c632" />
                            </div>
                        ))}
                    </div>
                )}
            </>
        );
    }
}
