import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Row,
  Col,
} from 'antd';

import Container from './Container';
import MyResources from './MyResources';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

export default class CreatorEndHome extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Creator end" key="1"><Container /></TabPane>
          <TabPane tab="My resources" key="2"><MyResources /></TabPane>
        </Tabs>
      </div>
    );
  }
}
