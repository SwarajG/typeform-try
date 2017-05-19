import React, { Component } from 'react';
import { LocaleProvider, Card, Icon } from 'antd';
import 'antd/dist/antd.css';
import enUS from 'antd/lib/locale-provider/en_US';
import logo from './logo.svg';
import './App.css';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Container from './components/Container';

class App extends Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <LocaleProvider locale={enUS}>
          <Container />
        </LocaleProvider>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
