import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import './LJ.css';
import { Button, Tag, Modal, Input, List, Drawer, Space, Upload, Select, Popconfirm, Rate, Form } from "antd";
import { LinkOutlined, EditFilled, UploadOutlined } from "@ant-design/icons";
import { serverURL } from '../index';
import { UserAvatar } from '../components/UserAvatar';
import { validCourses, validDegrees, validLevelsOfStudy } from './validOptions';


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
          {validLevelsOfStudy[(journalInfo.LevelOfStudy ?? 1) - 1]}
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

function useResetFormOnCloseModal (form, open) {
  const prevOpenRef = useRef(false);
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};

function AddModuleModal(props) {
  const { open, addModule, onCancel } = props;
  const [form] = Form.useForm();

  useResetFormOnCloseModal(form, open);

  const onOk = () => {
    addModule(form?.getFieldValue("moduleName"));
  };

  return (
    <Modal
      open={open}
      title="Module selection"
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onOk}
        >
          Submit
        </Button>
      ]}
    >
      <Form form={form}>
        <Form.Item name="moduleName" rules={[{ required: true }]}>
          <Input
            placeholder="New module"
            showCount="true"
            maxLength="30"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

function EditDrawer(props) {
  const { userInfo, journalInfo, open, setOpen } = props;

  const [Modalopen, ModalsetOpen] = useState(false);
  let formRef = useRef(null);

  const showModal = () => {
    ModalsetOpen(true);
  };

  const addModule = (module) => {
    const modules = [...(formRef.current?.getFieldValue('modules') ?? []), module];
    formRef.current.setFieldValue('modules', modules);
    ModalsetOpen(false);
  };

  const handleCancelModal = () => {
    ModalsetOpen(false);
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  const submitForm = async () => {
    const values = formRef.current?.getFieldsValue();
    const journalEditBody = {
      LevelOfStudy: values.levelOfStudy,
      UniversityCourse: values.course,
      University: values.university,
      Modules: formRef.current?.getFieldValue('modules')
    };
    await fetch(`${serverURL}/api/journal/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(journalEditBody),
    });
    setOpen(false);
  };

  const formLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const initialFormValues = {
    username: userInfo?.User_name,
    email: userInfo?.Email,
    university: journalInfo?.University,
    course: journalInfo?.UniversityCourse,
    degree: "Undergraduate",
    levelOfStudy: journalInfo?.LevelOfStudy,
    modules: journalInfo?.modules
  };

  return (
    <Drawer
      title="Your Information"
      placement="right"
      onClose={onDrawerClose}
      open={open}
      size='large'
      extra={
        <Space>
          <Button onClick={submitForm} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <div style={{ width: "100%" }}>
        <UserAvatar user={userInfo} size={56} /><br />
        <Upload {...props}>
          <Button size="small" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
        <Form
          {...formLayout}
          style={{ maxWidth: 600 }}
          className="edit-journal-form"
          ref={formRef}
          initialValues={initialFormValues}
        >
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input
              placeholder="Username"
              maxLength="30"
              showCount="true"
              size="small"
            />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input
              placeholder="Email"
              maxLength="30"
              showCount="true"
              size="small"
            />
          </Form.Item>
          <Form.Item name="university" label="University" rules={[{ required: true }]}>
            <Input
              placeholder="University"
              maxLength="30"
              showCount="true"
              size="small"
            />
          </Form.Item>

          <Form.Item name="course" label="Course" rules={[{ required: true }]}>
            <Select
              showSearch
              style={{ width: "60%" }}
              placeholder="Select a course"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            >
              {validCourses.map((course, i) => 
                <Select.Option value={course.label} key={i}>{course.label}</Select.Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item label="Level of Study">
            <Input.Group compact>
              <Form.Item name="degree" noStyle rules={[{ required: false }]}>
                <Select
                  style={{ width: "60%" }}
                >
                  {validDegrees.map((degree, i) => 
                    <Select.Option value={degree.label} key={i}>{degree.label}</Select.Option>
                  )}
                </Select>
              </Form.Item>

              <Form.Item name="levelOfStudy" noStyle rules={[{ required: true }]}>
                <Select
                  style={{ width: "30%" }}
                >
                  {validLevelsOfStudy.map((level, i) => 
                    <Select.Option value={i+1} key={i}>{level}</Select.Option>
                  )}
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item label="Modules" shouldUpdate={
            (prevValues, curValues) => prevValues.users !== curValues.users
          }>
            {({ getFieldValue }) => {
              const modules = getFieldValue('modules') ?? [];
              return (
                <div>
                  {modules.map((module, i) => 
                    <Tag color="blue" key={i}>
                      {module}
                    </Tag>
                  )}
                  <Tag color="blue">
                    <button style={{ all: "unset", color: "blue", cursor: "pointer" }} onClick={showModal}>+</button>
                  </Tag>
                </div>
              );
            }}
          </Form.Item>
        </Form>
        <AddModuleModal open={Modalopen} addModule={addModule} onCancel={handleCancelModal} />
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${serverURL}/api/user`);
      if (res.status === 200) {
        setUserInfo(await res.json());
      }
    }
    fetchData().catch(console.error);
  }, [drawerOpen]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${serverURL}/api/journal`);
      if (res.status === 200) {
        setJournalInfo(await res.json());
      }
    }
    fetchData().catch(console.error);
  }, [drawerOpen]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${serverURL}/api/user/ratings`);
      if (res.status === 200) {
        setUserRatings(await res.json());
      }
    }
    fetchData().catch(console.error);
  }, [drawerOpen]);

  const showDrawer = () => {
    setDrawerOpen(true);
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
              <EditDrawer userInfo={ userInfo } journalInfo={ journalInfo } open={ drawerOpen } setOpen={ setDrawerOpen } /> :
              ''}
          </div>
          : ''}
      </div>

      {userRatings ? <RatingsList userRatings={ userRatings } /> : ''}
    </div>
  );
}
