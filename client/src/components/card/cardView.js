import React, { Component } from 'react';

import { Rate } from 'antd';

import './cardView.css';
import { Card } from 'antd';

import { changeNum } from './../utils';

class CardView extends Component {
  render() {
    const { card_dataset } = this.props;
    const { Meta } = Card;
    return (
      <Card
        className='card-container'
        hoverable
        // cover={<img alt="example" src={card_dataset.imgUrl} />}
        cover={<img alt="example" src="./../../images/learningartifact.png" />}
      >
        <Meta title={card_dataset.title} />
        <Rate allowHalf disabled defaultValue={changeNum(card_dataset.score)} />&nbsp;&nbsp;&nbsp;{card_dataset.score}
        <div className="card-text">{card_dataset.text}</div>
      </Card>
    );
  }
}

export default CardView;
