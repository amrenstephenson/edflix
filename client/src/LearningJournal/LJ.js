import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import './LJ.css';
import { Button, Tag, Modal, Input, List, Drawer, Space, Upload, Select, Popconfirm, Rate, Form, ConfigProvider, theme } from 'antd';
import { LinkOutlined, StarOutlined, UploadOutlined, EditFilled } from '@ant-design/icons';
import { serverURL } from '../index';
import { UserAvatar } from '../components/UserAvatar';
import { validCourses, validLevelsOfStudy } from './validOptions';
import ArtifactBanner from '../components/ArtifactBanner';

function UserInfo(props) {
  const { userInfo, journalInfo, drawerOpen, showDrawer, setDrawerOpen } = props;

  return (
    <>
      <div style={{marginBottom: 15, display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <UserAvatar user={userInfo} size={56} style={{marginRight: 10}} />
          <b>{userInfo.User_name}</b>
        </div>
        <div>
          <Button
            type="primary"
            shape="round"
            icon={<EditFilled />}
            onClick={showDrawer}
          >
              Edit Your information
          </Button>
          <EditDrawer userInfo={ userInfo } journalInfo={ journalInfo } open={ drawerOpen } setOpen={ setDrawerOpen } />
        </div>
      </div>
      { userInfo.Email &&
      <div style={{ display: 'flex' }}>
        <b>Email:</b>&nbsp;
        <div>
          {userInfo.Email}
        </div>
      </div>
      }
      <hr/>
    </>
  );
}

function JournalInfo(props) {
  const { journalInfo } = props;

  return (
    <>
      <div style={{marginBottom: 5, display: 'flex'}}>
        <b>Course:</b>&nbsp;
        <div>
          {journalInfo.UniversityCourse}
        </div>
      </div>
      <div style={{marginBottom: 5, display: 'flex'}}>
        <b>Level of Study:</b>&nbsp;
        <div>
          {validLevelsOfStudy[(journalInfo.LevelOfStudy ?? 1)]}
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <b>Modules:</b>&nbsp;
        <div>
          {(journalInfo.modules.map((module, i) => (
            <Tag color="blue" key={i}>
              {module}
            </Tag>
          )))}
        </div>
      </div>
    </>
  );
}

function useResetFormOnCloseModal(form, open) {
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
}

function AddModuleModal(props) {
  const { open, addModule, onCancel } = props;
  const [form] = Form.useForm();

  useResetFormOnCloseModal(form, open);

  const onOk = () => {
    addModule(form?.getFieldValue('moduleName'));
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
        </Button>,
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

function EditableTag(props) {
  const { module, onClose } = props;

  const closeTag = () => {
    onClose(module);
  };

  return (
    <Tag color="blue" closable onClose={closeTag}>
      {module}
    </Tag>
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

  const removeModule = (module) => {
    let modules = formRef.current?.getFieldValue('modules') ?? [];
    modules.splice(modules.indexOf(module), 1);
    formRef.current.setFieldValue('modules', modules);
  };

  const handleCancelModal = () => {
    ModalsetOpen(false);
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  const submitForm = async() => {
    // TODO: implement changing user info

    const form = formRef.current;

    try {
      await form?.validateFields();
      const values = form?.getFieldsValue();

      const journalEditBody = {
        LevelOfStudy: values.levelOfStudy,
        UniversityCourse: values.course,
        University: values.university,
        Modules: form?.getFieldValue('modules'),
      };
      const journalPromise = fetch(`${serverURL}/api/journal/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(journalEditBody),
      });

      const userEditBody = {
        email: values.email,
        username: values.username,
      };
      const userPromise = fetch(`${serverURL}/api/user/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userEditBody),
      });
      await Promise.all([journalPromise, userPromise]);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const formLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const initialFormValues = {
    username: userInfo?.User_name,
    email: userInfo?.Email,
    university: journalInfo?.University,
    course: journalInfo?.UniversityCourse,
    levelOfStudy: journalInfo?.LevelOfStudy ?? 1,
    modules: journalInfo?.modules,
  };

  return (
    <Drawer
      title="Your Information"
      placement="right"
      onClose={onDrawerClose}
      size="large"
      open={open}
      extra={
        <Space>
          <Button onClick={submitForm} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Form
            {...formLayout}
            className="edit-journal-form"
            ref={formRef}
            initialValues={initialFormValues}
            style={{width: '100%'}}
          >
            <Form.Item name="profile-pic" label="Profile Picture" rules={[{ required: false }]}>
              <Upload {...props}>
                <Button size="small" icon={<UploadOutlined />}>
            Upload
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input
                placeholder="Username"
                maxLength="30"
                showCount="true"
              />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input
                placeholder="Email"
                maxLength="30"
                showCount="true"
              />
            </Form.Item>
            <Form.Item name="university" label="University" rules={[{ required: true }]}>
              <Input
                placeholder="University"
                maxLength="30"
                showCount="true"
              />
            </Form.Item>

            <Form.Item name="course" label="Course" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Select a course"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.value ?? '').toLocaleLowerCase().includes(input.toLocaleLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.value ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.value ?? '').toLowerCase())
                }
              >
                {validCourses.map((course, i) =>
                  <Select.Option value={course.label} key={i}>{course.label}</Select.Option>,
                )}
              </Select>
            </Form.Item>

            <Form.Item name="levelOfStudy" label="Level of Study" rules={[{ required: false }]}>
              <Select>
                {validLevelsOfStudy.map((level, i) =>
                  <Select.Option value={i} key={i}>{level}</Select.Option>,
                )}
              </Select>
            </Form.Item>

            <Form.Item label="Modules" shouldUpdate={
              (prevValues, curValues) => prevValues.users !== curValues.users
            }>
              {({ getFieldValue }) => {
                const modules = getFieldValue('modules') ?? [];
                return (
                  <ConfigProvider
                    theme={{
                      algorithm: null,
                    }}
                  >
                    <div>
                      {modules.map((module, i) => <EditableTag module={module} onClose={removeModule} key={i} />,
                      )}
                      <Tag color="blue">
                        <button style={{ all: 'unset', cursor: 'pointer' }} onClick={showModal}>+</button>
                      </Tag>
                    </div>
                  </ConfigProvider>
                );
              }}
            </Form.Item>
          </Form>
          <AddModuleModal open={Modalopen} addModule={addModule} onCancel={handleCancelModal} />
        </div>
      </ConfigProvider>
    </Drawer>
  );
}

function getArtifactURL(artifact) {
  const searchParams = new URLSearchParams({
    artifact: artifact.Artifact_id,
    topic: artifact.Topic,
  });
  return `/?${searchParams.toString()}`;
}

function stripDescription(desc) {
  return desc.replace(/(<([^>]+)>)/ig, '');
}

function RatingsList(props) {
  const { userRatings, setUserRatings } = props;
  const [renders, setRenders] = useState(0);

  const removeRating = async(rating) => {
    await fetch(`${serverURL}/api/ratings/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ artifactID: rating.artifact.Artifact_id }),
    });
    userRatings.splice(userRatings.indexOf(rating), 1);
    setUserRatings(userRatings);
    setRenders(renders + 1);
  };

  return (
    <div>
      <div className='title' style={{textAlign: 'center', marginTop: 10, marginBottom: 5}}>
        Your Learning Journal
      </div>

      <div style={{ background: 'rgb(30, 30, 30)', width: 'calc(100% - 25px)', marginLeft: 12.5, marginBottom: 40, borderRadius: 10, border: '1px solid white' }}>
        <List
          style={{ color: 'white' }}
          itemLayout="vertical"
          size="small"
          pagination={{
            pageSize: 4,
          }}
          locale={{ emptyText: (
            <div style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <StarOutlined size={200} style={{fontSize: 40, marginBottom: 10, marginTop: 20}} />
              <span style={{fontSize: 16}}>You have not rated any artifacts.</span>
            </div>
          ) }}
          dataSource = {
            userRatings.map((ratingInfo) => ({
              href: getArtifactURL(ratingInfo.artifact),
              title: ratingInfo.artifact.Artifact_Name,
              description: stripDescription(ratingInfo.artifact.Description),
              rating: ratingInfo.rating,
              url: ratingInfo.artifact.ArtifactURL,
              image: ratingInfo.artifact.ThumbnailURL,
              ratingInfo: ratingInfo,
            }))
          }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={250}
                  alt="artifact thumbnail"
                  src={item.image}
                />
              }
            >
              <List.Item.Meta
                title={(
                  <>
                    {item.title}
                    <div className="rating-rate" style={{color: 'white', fontWeight: 'normal', marginBottom: -10 }} key={0}>
                      <Rate allowHalf disabled defaultValue={item.rating} />
                        &nbsp;&nbsp;&nbsp;{item.rating} out of 5
                    </div>
                  </>
                )}
                description={item.description}
              />
              <div style={{display: 'flex', marginBottom: 10 }}>
                <a href={item.href} className='hover-dim' style={{marginRight: 7, textDecoration: 'none', backgroundColor: '#33aaff', color: 'black', border: 'solid 1px #33aaff', borderRadius: '5px', fontSize: 'medium', padding: '2px 5px 2px 5px'}}>
                  Open Artifact
                </a>
                <a href={item.url} target="_blank" rel="noreferrer" className='hover-dim' style={{marginRight: 7, textDecoration: 'none', backgroundColor: 'rgb(45 45 45)', color: '#33ffaa', border: 'solid 1px #33ffaa', borderRadius: '5px', fontSize: 'medium', padding: '2px 5px 2px 5px'}}>
                  Visit Resource <LinkOutlined />
                </a>
                <Popconfirm
                  title="Delete the artifact"
                  description="Are you sure to delete this artifact?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => removeRating(item.ratingInfo)}
                >
                  <button className='hover-dim' style={{backgroundColor: 'rgb(45 45 45)', color: 'red', border: 'solid 1px', borderRadius: '5px', fontSize: 'medium', padding: '2px 5px 2px 5px'}}>
                      Delete
                  </button>
                </Popconfirm>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

function NotLoggedIn() {
  return (
    <h1 style={{ textAlign: 'center' }}>
      You are not logged in
    </h1>
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
  }, []);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="learning-journal">
      <header>
        <NavBar />
      </header>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff0000',
          },
        }}
      >
        <ArtifactBanner url='images/banner-journal.png' />
        <main className="container">
          {userInfo ?
            <div>
              <div className='title' style={{textAlign: 'center', marginBottom: 5}}>
              Your Information
              </div>
              <div className='userinfo'>
                <UserInfo userInfo={ userInfo } journalInfo={ journalInfo } drawerOpen={ drawerOpen } showDrawer={ showDrawer } setDrawerOpen={ setDrawerOpen } />
                {journalInfo ?
                  <JournalInfo journalInfo={ journalInfo } /> :
                  <div style={{textAlign: 'center'}}>You have not entered your course details.</div>
                }
              </div>
              <br />
            </div>
            : <NotLoggedIn />}

          {userRatings ? <RatingsList userRatings={ userRatings } setUserRatings={ setUserRatings } /> : ''}
        </main>
      </ConfigProvider>
    </div>
  );
}
