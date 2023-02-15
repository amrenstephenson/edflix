import React, { Component } from 'react';
import './popup.css'

import { Select, Collapse, Rate, Progress } from 'antd';
import { CloseOutlined, CaretRightOutlined, CaretDownOutlined, PlusOutlined, MinusOutlined, FolderAddFilled, CheckCircleFilled } from '@ant-design/icons';

// card for  recommendation
import CardView from "./../card/cardView"

//function for rating
import { changeNum } from "./../utils"

class Popup extends Component {
    state = {
        popup_dataset: {
            title: "Journey to Cloud: Envisioning Your Solution",
            bannerPic: require('../../images/learningartifact.png'),
            introduction: {
                title: "Introduction",
                text: "This credential earner demonstrates knowledge andunderstanding of the digital transformation drivers made possible by cloud technologies andservices. This includes: how cloud works, its capabilities, types, and delivery models (IaaS, SaaS,and PaaS); digital transformation strategies such as Agile practices, the IBM Garage Method, andEnterprise Design Thinking to help organizations get started on their transformation journey; &deploying a test pilot cloud application using IBM Code Engine."
            },
            information: {
                title: "Information",
                // textArr: ["Last update on 26/01/2022", "Owned by", "IBM Corporation"]
                text: "Last update on 26/01/2022"
            },
            outline: {
                title: "Outline",
                list: [
                    {
                        label: "Part One",
                        key: 1,
                        value: "DIGITAL TRANSFORMATION WITH CLOUD COMPUTING",
                        list: [
                            "The New Digital Age",
                            "What Is Cloud",
                            "Benefits Of Cloud Computing",
                            "Cloud Delivery",
                            "Cloud Service Type"
                        ]
                    },
                    {
                        label: "Part Two",
                        key: 2,
                        value: "CLOUD ADOPTION JOURNEY: IDEATION PRACTICES",
                        list: [
                            "Cloud Transformation with the IBM Garage Mwthod",
                            "Frame Your Bussiness Opportunity",
                            "Embracing User-Centric Design"
                        ]
                    },
                    {
                        label: "Part Three",
                        key: 3,
                        value: "DEPLOY A PILOT APPLICATION IN IBM CODE ENGINE",
                        list: [
                            "Case Study 1:Defining our Minimal Viable Product",
                            "Milestone 1:Build & Deploy a Pilot Cloud App",
                            "Milestone 2:Generate Traffic"
                        ]
                    }
                ]
            },
            rating: {
                title: "User reviews",
                score: 3.9,
                tipc: "10 global ratings",
                list: [
                    {
                        lable: "5 Star",
                        proportion: 30
                    },
                    {
                        lable: "4 Star",
                        proportion: 40
                    },
                    {
                        lable: "3 Star",
                        proportion: 20
                    },
                    {
                        lable: "2 Star",
                        proportion: 10
                    },
                    {
                        lable: "1 Star",
                        proportion: 0
                    }
                ]
            },
            recommendation: {
                title: "Recommendation",
                card: [
                    {
                        title: "Recommend title1",
                        imgUrl: require('../../images/learningartifact.png'),
                        score: 4.9,
                        text: "Information about the recommended material, which can be something about them such as: field, author, length of study. Or a brief introduction to them."
                    },
                    {
                        title: "Recommend title2",
                        imgUrl: require('../../images/learningartifact.png'),
                        score: 4.6,
                        text: "Information about the recommended material, which can be something about them such as: field, author, length of study. Or a brief introduction to them."
                    },
                    {
                        title: "Recommend title3",
                        imgUrl: require('../../images/learningartifact.png'),
                        score: 4.1,
                        text: "Information about the recommended material, which can be something about them such as: field, author, length of study. Or a brief introduction to them."
                    }
                ]
            }
        },
        outline_dataset: [
            {
                label: "DIGITAL TRANSFORMATION WITH CLOUD COMPUTING",
                key: 1,
                value: "DIGITAL TRANSFORMATION WITH CLOUD COMPUTING",
                list: [
                    "The New Digital Age",
                    "What Is Cloud",
                    "Benefits Of Cloud Computing",
                    "Cloud Delivery",
                    "Cloud Service Type"
                ]
            },
            {
                label: "CLOUD ADOPTION JOURNEY: IDEATION PRACTICES",
                key: 2,
                value: "CLOUD ADOPTION JOURNEY: IDEATION PRACTICES",
                list: [
                    "Cloud Transformation with the IBM Garage Mwthod",
                    "Frame Your Bussiness Opportunity",
                    "Embracing User-Centric Design"
                ]
            },
            {
                label: "DEPLOY A PILOT APPLICATION IN IBM CODE ENGINE",
                key: 3,
                value: "DEPLOY A PILOT APPLICATION IN IBM CODE ENGINE",
                list: [
                    "Case Study 1:Defining our Minimal Viable Product",
                    "Milestone 1:Build & Deploy a Pilot Cloud App",
                    "Milestone 2:Generate Traffic"
                ]
            }
        ],
        is_open: false,
        select_dataset: [
            {
                label: "Select All",
                key: 0,
                value: "Select All",
            },
            {
                label: "Part One",
                key: 1,
                value: "Part One"
            },
            {
                label: "Part Two",
                key: 2,
                value: "Part Two"
            },
            {
                label: "Part Three",
                key: 3,
                value: "Part Three"
            }
        ],
        collection: false
    }
  closePopup = (e) => {
    e.stopPropagation();
    this.props.closePopup(false)
    }

 
    selectOutline = (item, options) => {
        let key = item.key
        console.log(key)
        if (key === 0) {
            this.setState({ outline_dataset: this.state.popup_dataset.outline.list })
        }
        else {
            this.setState({ outline_dataset: [this.state.popup_dataset.outline.list[key - 1]] })
        }
    }
    openIntroductionText = () => {
        this.setState({ is_open: !this.state.is_open })
    }
    collectionClick = () => {
        this.setState({ collection: !this.state.collection })
    }
    render() {
        let { popup_dataset, outline_dataset, is_open, select_dataset, collection } = this.state
        const { Panel } = Collapse;
        // outline
        const outlineTemplate = () => {
            return (
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                >
                    {outline_dataset.map((ul, i) => {
                        return (
                            <Panel header={i + 1 + '、' + ul.value} key={i + 1}>
                                {ul.list.map((li, j) => (<li key={j}>{i + 1 + '-' + (j + 1) + '、'}{li}</li>))}
                            </Panel>
                        )
                    })}
                </Collapse>
            )
        }
        // current_rating
        const currentRatingTemplate = () => {
            return (
                <div>
                    {popup_dataset.rating.list.map((item, i) => (<div key={i} className="rating-progress flex-center"><span className='rating-progress-text' style={{ whiteSpace: "nowrap" }}>{item.lable}</span><Progress percent={item.proportion} strokeWidth="18px" strokeColor="#f3c632" /></div>))}
                </div>
            )
        }
        return (
            <div className='popup-container fixed'>
                {/* The title and image of artifact */}
                <div className="popup-header">
                    <img src={popup_dataset.bannerPic} alt="" className="popup-header-img" />
                    <CloseOutlined onClick={this.closePopup} className='popup-close-btn' />
                    <div className="popup-header-title">{popup_dataset.title}</div>
                </div>
                <div className="popup-content">
                    {/* Brief decription */}
                    <div className="popup-content-description flex">
                        <div className="description-left">
                            <div className="description-left-title"><div className='subtitle'>{popup_dataset.introduction.title}</div><hr /></div>
                            <div className={`description-left-content ${is_open ? '' : 'ellipsis'}`}>{popup_dataset.introduction.text}{is_open ? <MinusOutlined onClick={this.openIntroductionText} /> : <PlusOutlined onClick={this.openIntroductionText} />}</div>
                        </div>
                        <div className="description-right">
                            <div className="description-right-title"><div className='subtitle'>{popup_dataset.information.title}</div></div>
                            <div className="description-right-content">
                                &#9898;{popup_dataset.information.text}<br />
                                &#9898;Owned by&nbsp;
                                <a href="https://www.ibm.com/uk-en" target="_blank" rel="noreferrer">IBM Corporation</a>.
                            </div>
                        </div>
                    </div>
                    {/* The outline of artifact */}
                    <div className='popup-content-outline'>
                        <div className="popup-content-outline-title flex-between">
                            <div style={{ flexGrow: "1", marginRight: "20px" }}>
                                <span className="subtitle">{popup_dataset.outline.title}</span>
                                <hr />
                            </div>
                            {/* select 1、 */}
                            {/* <Select
                                allowClear
                                labelInValue
                                suffixIcon={<CaretDownOutlined />}
                                options={popup_dataset.outline.list}
                                notFoundContent={"no content"}
                                placeholder={"All"}
                                onSelect={this.selectOutline}
                                onClear={this.clearOutline}
                            /> */}
                            {/* select 2、 */}
                            <Select
                                allowClear
                                labelInValue
                                suffixIcon={<CaretDownOutlined />}
                                options={select_dataset}
                                notFoundContent={"no content"}
                                placeholder={"All"}
                                onSelect={this.selectOutline}
                            />
                        </div>
                        <div className='popup-content-outline-main'>{outlineTemplate()}</div>
                    </div>
                    {/* Link and User rating */}
                    {/* link */}
                    <div className="popup-content-link flex-center-center">
                        <i className='popup-content-link-lable'>IBM</i>
                        <a className='popup-content-link-a' href="https://keyskill-clms.comprehend.ibm.com/pluginfile.php/131656/mod_tincanlaunch/content/index.html?endpoint=https%3A%2F%2Fcars-us.comprehend.ibm.com%2Fdata%2FxAPI%2F&auth=Basic%20YTVkZjAwN2I5M2RiN2QwOTJiYjk5NGI2NThkMzc4Njc1MjJhMzNmODo4NTQ0ZDE3OGE3MTJmOGYwMjc3YTcxNWQzMTM4OGZmY2RjYmYzMTU0&actor=%7B%22objectType%22%3A%22Agent%22%2C%22name%22%3A%22Hengrui%20Xu%22%2C%22mbox%22%3A%22mailto%3Ajzdw38%40durham.ac.uk%22%7D&registration=7beafa20-c459-4c8a-a1ac-a61c4ecf6f8f&activity_id=http%3A%2F%2FRH-FND-2021-R0#/" target="_blank" rel="noreferrer">
                            {"Go to IBM and start studying >"}
                            {/* <RightOutlined className='popup-content-link-icon'/> */}
                        </a>
                    </div>
                    <hr />
                    {/* User rating */}
                    <div className="popup-content-rating flex">
                        <div style={{ flex: 1 }}>
                            <div className="subtitle"><b>Your rating</b></div>
                            <Rate allowHalf defaultValue={1.5} style={{ margin: "5px 0" }} />
                            <div><button className='popup-content-rating-submit'>Submit</button></div>
                        </div>
                        <div style={{ flex: 1, borderLeft: "2px solid #4d4d4d", paddingLeft: "20px" }}>
                            <div>You can add it to your learning journey,If you like.</div>
                            {/* <a href='#!' className='popup-content-rating-a'>Add to my journey.</a> */}
                            {collection ? <CheckCircleFilled className='popup-content-rating-icon' onClick={this.collectionClick} /> : <FolderAddFilled className='popup-content-rating-icon' onClick={this.collectionClick} />}
                        </div>
                    </div>
                    {/* current_rating */}
                    <div className="popup-content-current-rating">
                        <div className="rating-subtitle subtitle">{popup_dataset.rating.title}<hr /></div>
                        <div className="rating-rate"><Rate allowHalf disabled defaultValue={changeNum(popup_dataset.rating.score)} />&nbsp;&nbsp;&nbsp;{popup_dataset.rating.score} out of {popup_dataset.rating.score > 5 ? 10 : 5}</div>
                        <div className="rating-tipc">{popup_dataset.rating.tipc}</div>
                        {currentRatingTemplate()}
                    </div>
                    {/* recommendation */}
                    <div className="popup-content-recommendation">
                        <div className="subtitle">{popup_dataset.recommendation.title}<hr /></div>
                        {/* <CardView card_dataset={popup_dataset.recommendation.card} /> */}
                        <div className="recommendation-card flex-wrap">
                            {popup_dataset.recommendation.card.map((item, i) => {
                                return (<CardView key={i} card_dataset={item} />)
                            })}
                        </div>
                    </div>
                </div>
                <div className="popup-other"></div>
            </div>
        );
    }
}

export default Popup;
