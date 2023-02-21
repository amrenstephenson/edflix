import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './LJ.css';
import { Button, Tag, Modal, Input, List, Drawer, Space, Upload, Select, Popconfirm, Rate } from "antd";
import { LinkOutlined, EditFilled, UploadOutlined } from "@ant-design/icons";
import { serverURL } from '../index';
import { UserAvatar } from '../components/UserAvatar';


const modules = Array.from({ length: 6 }).map((_, i) => `module ${i}`);

const userinfomation = [
  {
    username: "usernmae",
    picture:
      "https://img.ixintu.com/download/jpg/20200827/a58b21d43b1d6d5fa679123b3d1a2dd6_512_512.jpg!con",
    id: "user id",
    email: "example@example.com",
    course: "computer science",
    degree: "undergraduate",
    stage: "year 2",
    module: modules
  }
];

const courses = [
  { label: "Computer Science" },
  { label: "Math" },
  { label: "Artificial Intelligence" },
  { label: "Data Science" },
  { label: "Power System" },
  { label: "Engineering" },
  { label: "Security" }
];

const Degree = [
  { label: "High school" },
  { label: "Undergraduate" },
  { label: "Master" },
  { label: "Phd" },
  { label: "Professor" },
  { label: "other" }
];

const stages = [
  { label: "year 1" },
  { label: "year 2" },
  { label: "year 3" },
  { label: "Research" },
  { label: "Other" }
];







function UserInfo(props) {
  const { userInfo } = props;

  return (
    <thead className="basicinfo">
      <tr>
        <th rowSpan="2" className="username_title">
          <div className="username">{userInfo.User_name}</div>
          <div className="ProfilePicture">
            <UserAvatar user={userInfo} size={56} />
          </div>
        </th>
        <th className="email_title">Email:</th>
        <th className="email">{userInfo.Email}</th>
      </tr>
    </thead>
  );
}

function JournalInfo(props) {
  const { journalInfo } = props;

  return (
    <tbody>
      <tr>
        <td className="course_title">Course</td>
        <td className="degree_title">Level of study</td>
        <td className="modules_title">Modules</td>
      </tr>
      <tr>
        <td className="course">{journalInfo.UniversityCourse}</td>
        <td className="degree">
          Level {journalInfo.LevelOfStudy}
          <br />
        </td>
        <td className="modules">
          {(journalInfo.modules.map((module, i) => (
            <Tag color="blue" key={i}>
              {module}
            </Tag>
          )))}
        </td>
      </tr>
    </tbody>
  );
}

function EditDrawer(props) {
  const { userInfo, journalInfo, open, setOpen } = props;

  const [loading, setLoading] = useState(false);
  const [Modalopen, ModalsetOpen] = useState(false);

  const showModal = () => {
    ModalsetOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      ModalsetOpen(false);
    }, 3000); //TODO: remove arbitrary 3 second wait
  };

  const handleCancel = () => {
    ModalsetOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title="Your Information"
      placement="right"
      onClose={onClose}
      open={open}
      size='large'
      extra={
        <Space>
          <Button onClick={onClose} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th rowSpan="2" className="edit_picture">
                <UserAvatar user={userInfo} size={56} />
              </th>
              <th className="edit_basic_info">Username:</th>
              <th className="inputbox">
                <Input
                  placeholder="Username"
                  defaultValue={userInfo.User_name}
                  maxLength="30"
                  showCount="true"
                  size="small"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="submit_picture">
                <Upload {...props}>
                  <Button size="small" icon={<UploadOutlined />}>
                          Upload
                  </Button>
                </Upload>
              </td>
              <td className="edit_basic_info">Email:</td>
              <td className="inputbox">
                <Input
                  placeholder="Email"
                  defaultValue={userInfo.Email}
                  maxLength="30"
                  showCount="true"
                  size="small"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>
      <div>
        <h1 className="edit_course_degree_module_title">Course:</h1>
        <Select
          showSearch
          style={{ width: "60%" }}
          placeholder="Select a course"
          defaultValue={journalInfo?.UniversityCourse}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={courses}
        />
      </div>
      <br />
      <div>
        <h2 className="edit_course_degree_module_title">Degree:</h2>
        <Select
          defaultValue={userinfomation[0].degree}
          style={{ width: "60%" }}
          options={Degree}
        />
        <Select
          defaultValue={journalInfo ? stages[parseInt(journalInfo.LevelOfStudy, 10) - 1].label : stages[0].label}
          style={{ width: "30%" }}
          options={stages}
        />
      </div>
      <br />
      <div>
        <h3 className="edit_course_degree_module_title">Modules:</h3>
        <div>
          {journalInfo?.modules?.map((module, i) => (
            <Tag color="blue" key={i}>
              {module}
            </Tag>
          ))}
          <Tag color="blue">
            <button style={{ all: "unset", color: "blue", cursor: "pointer" }} onClick={showModal}>+</button>
          </Tag>
          <Modal
            open={Modalopen}
            title="Module selection"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleOk}
              >
                Submit
              </Button>
            ]}
          >
            <Input
              placeholder="New module"
              showCount="true"
              maxLength="30"
            />
          </Modal>
        </div>
      </div>
    </Drawer>
  );
}

function stripDescription(desc) {
  return desc.replace( /(<([^>]+)>)/ig, '');
}

function RatingsList(props) {
  const { userRatings } = props;

  return (
    <div>
      <div className='title' style={{textAlign:'center',marginTop:'2rem',marginBottom:'2rem'}}>
        Your Learning Journal
      </div>

      <div style={{ background:'rgb(30, 30, 30)',width:'80%',marginLeft:'10%' }}>
        <List
          style={{ color:'white'}}
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: (page) => {
              console.log(page); //TODO: remove this
            },
            pageSize: 4
          }}
          dataSource = {
            userRatings.map((ratingInfo, i) => ({
              href: `/?artifact=${ratingInfo.artifact.Artifact_id}`,
              title: ratingInfo.artifact.Artifact_Name,
              description: stripDescription(ratingInfo.artifact.Description),
              rating: ratingInfo.rating,
              url: ratingInfo.artifact.ArtifactURL,
              image: ratingInfo.artifact.ThumbnailURL,
              content:     
                  <Popconfirm
                    title="Delete the artifact"
                    description="Are you sure to delete this artifact?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <button href="#" style={{backgroundColor:'rgb(45 45 45)',color:'red',border:'solid 1px',borderRadius:'5px',fontSize:'medium', padding: "2px 5px 2px 5px"}}>
                      Delete
                    </button>
                  </Popconfirm>
            }))
          }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <div className="rating-rate" style={{color:'white'}}>
                  <Rate allowHalf disabled defaultValue={item.rating} />
                        &nbsp;&nbsp;&nbsp;{item.rating} out of 5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href={item.url} target="_blank" rel="noreferrer"><LinkOutlined style={{fontSize:'2.25rem'}} /></a>
                </div>
                      
              ]}
              extra={
                <img
                  width={250}
                  alt="logo"
                  src={item.image}
                />
              }
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}


export default function LearningJournal() {
  const [userInfo, setUserInfo] = useState(null);
  const [journalInfo, setJournalInfo] = useState(null);
  const [userRatings, setUserRatings] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${serverURL}/api/user`);
      if (res.status === 200) {
        setUserInfo(await res.json());
      }
    }
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${serverURL}/api/journal`);
      if (res.status === 200) {
        setJournalInfo(await res.json());
      }
    }
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${serverURL}/api/user/ratings`);
      if (res.status === 200) {
        setUserRatings(await res.json());
      }
    }
    fetchData().catch(console.error);
  }, []);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <div className="learning-journal">
      <div>
        <NavBar />
      </div>
      <div 
        style={{
          backgroundImage: 'linear-gradient(0, black, transparent), url("images/testing/learningJ.jpg")', //TODO: image does not exist
          backgroundSize: '100%',
          height: '20rem',
          width: '100%',
        }}
      />
      <div>
        <table className="userinfo">
          {userInfo ? <UserInfo userInfo={ userInfo } /> : ''}
          {journalInfo ? <JournalInfo journalInfo={ journalInfo } /> : ''}
        </table>
        <br />
        {userInfo ?
          <div style={{ width: "90%", textAlign: "right" }}>
            <Button
              type="primary"
              shape="round"
              icon={<EditFilled />}
              onClick={showDrawer}
            >
              Edit Your information
            </Button>
            {userInfo ?
              <EditDrawer userInfo={ userInfo } journalInfo={ journalInfo } open={ open } setOpen={ setOpen } /> :
              ''}
          </div>
          : ''}
      </div>

      {userRatings ? <RatingsList userRatings={ userRatings } /> : ''}
    </div>
  );
}
