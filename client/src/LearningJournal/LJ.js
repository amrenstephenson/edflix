import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './LJ.css'
import { Table,Button, Tag,Modal,Input,List,message, Popconfirm, Rate } from "antd";
import {LinkOutlined} from "@ant-design/icons";

const modules = Array.from({ length: 10 }).map((_, i) => `module ${i}`);
const { Column, ColumnGroup } = Table;




const userinfomation = [
  {
    key: "1",
    Degree: "Undergraduate year 2",
    Cources: "Computer science",
    tags: modules
  }
];




const data = Array.from({ length: 20 }).map((_, i) => ({
  href: "http://localhost:3000/",
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
}));



export default function LearningJournal() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
  
    const showModal = () => {
      setOpen(true);
    };
  
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };
  
    const handleCancel = () => {
      setOpen(false);
    };

    return(
        <div>
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
            {/* <h2 className='title'>Recently added artifacts</h2> */}
            <Table dataSource={userinfomation}style={{ width: "80%", height: "30%", marginLeft: "10%",borderCollapse:'separate',borderSpacing:'0',borderRadius:'10px',border:'solid 2px' }}>
              <ColumnGroup title="UserName">
                  <Column title="Degree" dataIndex="Degree" key="Degree" />
                  <Column title="Cources" dataIndex="Cources" key="Cources" />
              </ColumnGroup>
              <Column title="Modules" dataIndex="tags" key="tags" render={(tags) => (<>
                  {tags.map((tag) => (
                    <Tag color="blue" key={tag}>{tag}</Tag>
                    ))}
                    <Tag color="blue">
                      <a onClick={showModal}>+</a>
                    </Tag>
                    <Modal
                      open={open}
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
                      <Input placeholder="New module" showCount="true" maxLength="30" />
                    </Modal>
                                </>
                )}
              /> 
            </Table>


            <div className='title' style={{textAlign:'center',marginTop:'2rem',marginBottom:'2rem'}}>
              Your Learning Journal
            </div>

            <div style={{ background:' rgb(30, 30, 30)',width:'80%',marginLeft:'10%' }}>
              <List
                tyle={{ color:'white'}}
                itemLayout="vertical"
                size="small"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 5
                }}
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    actions={[
                      <div className="rating-rate" style={{color:'white'}}>
                        <Rate allowHalf disabled defaultValue={3} />
                        &nbsp;&nbsp;&nbsp;{3} out of {""}
                        {3 > 5 ? 10 : 5}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href='https://www.ibm.com/uk-en' target="_blank"><LinkOutlined style={{fontSize:'2.25rem'}} /></a>
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
    )

}


