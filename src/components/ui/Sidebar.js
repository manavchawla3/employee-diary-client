import React, { Component, Fragment } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <Fragment>
        <Menu style={{ height: '100vh' }}>
          <h2 className="m-2 ml-4">Employee Diary</h2>
          <Menu.Divider />
          <Menu.ItemGroup>
            <Menu.Item key="0" className="d-flex align-items-center">
              <Link to="/">
                <Icon type="home" className="mr-2" />
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="1" className="d-flex align-items-center">
              <Link to="/add-employee">
                <Icon type="plus" className="mr-2" />
                Add New Employee
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Fragment>
    );
  }
}
