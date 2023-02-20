import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './LJ.css';
import { Button, Tag, Modal, Input, List, Avatar, Drawer, Space, Upload, Select, Popconfirm, Rate } from "antd";
import { LinkOutlined, EditFilled, UploadOutlined } from "@ant-design/icons";
import { serverURL } from '../index';


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
            <Avatar size={56} src={userinfomation[0].picture} />
          </div>
        </th>
      </tr>
      <tr>
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
          
          <Tag color="blue">
            <a style={{ color: "blue" }}>...</a>
          </Tag>
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
                <Avatar size={56} src={userinfomation[0].picture} />
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
          defaultValue={journalInfo.UniversityCourse}
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
          defaultValue={stages[parseInt(journalInfo.LevelOfStudy, 10) - 1]}
          style={{ width: "30%" }}
          options={stages}
        />
      </div>
      <br />
      <div>
        <h3 className="edit_course_degree_module_title">Modules:</h3>
        <div>
          {journalInfo.modules.map((module, i) => (
            <Tag color="blue" key={i}>
              {module}
            </Tag>
          ))}
          <Tag color="blue">
            <a style={{ color: "blue" }} onClick={showModal}>+</a>
          </Tag>
          <Modal
            open={Modalopen}
            title="Module selection"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                      Return
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

function RatingsList(props) {
  return (
    <div>
      <div className='title' style={{textAlign:'center',marginTop:'2rem',marginBottom:'2rem'}}>
        Your Learning Journal
      </div>

      <div style={{ background:'rgb(30, 30, 30)',width:'80%',marginLeft:'10%' }}>
        <List
          tyle={{ color:'white'}}
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4
          }}
          dataSource = {
            Array.from({ length: 21 }).map((_, i) => ({
              href: "/",
              title: `Artifact ${i}`,
              description:
              "Focused training for experienced UNIX administrators on how to install, customize, and administer the AIX operating system in a multiuser POWER partitioned environment. It is based on AIX 7.1 running on a Power system managed by Hardware Management Console v7. I(earlier versions also discussed)", 
              content:     
                  <Popconfirm
                    title="Delete the artifact"
                    description="Are you sure to delete this artifact?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <button href="#" style={{backgroundColor:'rgb(45 45 45)',color:'red',border:'solid 1px',borderRadius:'5px',fontSize:'medium'}}>Delete</button>
                  </Popconfirm>
            }))
          }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <div className="rating-rate" style={{color:'white'}}>
                  <Rate allowHalf disabled defaultValue={3} />
                        &nbsp;&nbsp;&nbsp;{3} out of {""}
                  {3 > 5 ? 10 : 5}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href='https://www.ibm.com/uk-en' target="_blank" rel="noreferrer"><LinkOutlined style={{fontSize:'2.25rem'}} /></a>
                </div>
                      
              ]}
              extra={
                <img
                  width={250}
                  alt="logo"
                  src="images/testing/artifiact-image.png"
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
  const defaultUserInfo = {};
  const defaultJournalInfo = {modules: []};

  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [journalInfo, setJournalInfo] = useState(defaultJournalInfo);

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

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return(
    <div className="learning-journal">
      <div>
        <NavBar />
      </div>
      <div 
        style={{
          backgroundImage: 'linear-gradient(0, black, transparent), url("images/testing/learningJ.jpg")',
          backgroundSize: '100%',
          height: '20rem',
          width: '100%',
        }}
      />
      <div>
        <table className="userinfo">
          <UserInfo userInfo={ userInfo } />
          <JournalInfo journalInfo={ journalInfo } />
        </table>
        <br />
        <div style={{ width: "90%", textAlign: "right" }}>
          <Button
            type="primary"
            shape="round"
            icon={<EditFilled />}
            onClick={showDrawer}
          >
                  Edit Your information
          </Button>
          <EditDrawer userInfo={ userInfo } journalInfo={ journalInfo } open={ open } setOpen={ setOpen } />
        </div>
      </div>

      <RatingsList />
    </div>
  );
}
