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

export default class CreatorEndHome extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="My resources" key="1"><MyResources /></TabPane>
          <TabPane tab="Creator end" key="2"><Container /></TabPane>
        </Tabs>
      </div>
    );
  }
}
