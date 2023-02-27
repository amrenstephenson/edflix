import { Component } from 'react';
import { Rate, Progress } from 'antd';

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
                                        <Rate allowHalf disabled value={Math.floor(this.props.rating.average * 2) / 2} />
                                        &nbsp;&nbsp;&nbsp;{this.props.rating.average.toFixed(1)} out of 5.0
                  </div>
                  <div className="rating-tipc">
                    {this.props.rating.counts.total} Total Rating{this.props.rating.counts.total === 1 ? '' : 's'}
                  </div>
                </>
              )}
            </div>

            {[5, 4, 3, 2, 1].map((i) => (
              <div key={i} className="rating-progress flex-center">
                <span className="rating-progress-text" style={{ whiteSpace: 'nowrap' }}>
                  {i} Star
                </span>
                <Progress status="normal" percent={this.props.rating.counts && this.props.rating.counts[i] ? ((this.props.rating.counts[i] / this.props.rating.counts.total) * 100).toFixed(0) : 0} strokeWidth="18px" strokeColor="#f3c632" />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
}
