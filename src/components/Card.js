import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import {
  Icon,
  Modal,
  Row,
  Col,
  Input,
} from 'antd';
import ItemTypes from './ItemTypes';
import LearningLesson from './LearningLesson';
import NormalAssignment from './NormalAssignment';
import PeerAssignment from './PeerAssignment';

const style = {
  border: '1px solid',
  padding: '8px',
  marginBottom: '10px',
  cursor: 'move',
  textAlign: 'left',
  display: 'inline-block',
  width: '300px',
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const confirm = Modal.confirm;

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Card extends Component {

  constructor() {
    super();
    this.state = {
      modalVisible: false,
      modalVisibleSection: false,
      sectionTitle: '',
    };
  }

  showModal = (text) => {
    if (text === 'Section') {
      this.setState({
        modalVisibleSection: true,
      })
    } else {
      this.setState({
        modalVisible: true,
      });
    }
  }

  handleOkForSection = (id) => {
    this.props.updateCardName(id, this.state.sectionTitle);
    this.setState({
      modalVisibleSection: false,
    });
  }

  handleOk = (text, id, titleText) => {
    if (text === 'Section') {
      this.setState({
        modalVisibleSection: false,
      });
    } else {
      this.setState({
        modalVisible: false,
      });
    }
  }
  handleCancel = (text) => {
    if (text === 'Section') {
      this.setState({
        modalVisibleSection: false,
      })
    } else {
      this.setState({
        modalVisible: false,
      });
    }
  }
  getPageHeight = () => {
    return window.innerHeight;
  }
  getPageWidth = () => {
    return window.innerWidth;
  }
  sectionTitleUpdate = (e) => {
    this.setState({
      sectionTitle: e.target.value,
    });
  }

  showConfirm = (type, id) => {
    confirm({
      title: 'Want to delete these card?',
      content: 'This wil delete the card from the list. Are you sure?',
      onOk: () => {
        this.props.deleteCardFromList(type, id);
      },
      onCancel: () => {},
    });
  }

  onSectionClick = (type, id) => {
    if (type === 'Section') {
      this.setState({
        activeSection: id,
      });
      this.props.makeActiveSection(id);
    }
  }

  render() {
    const { type, isDragging, connectDragSource, connectDropTarget, id, name, activeSectionId } = this.props;
    const opacity = isDragging ? 0 : 1;
    const marginLeft = (type !== 'Section') ? '40px' : '0px';
    const bgColor = (activeSectionId === id) ? '#3498db' : 'white';
    const color = (activeSectionId === id) ? 'white' : 'black';

    return connectDragSource(connectDropTarget(
      <div>
        <Modal
          visible={this.state.modalVisible}
          onOk={() => this.handleOk(type)} onCancel={() => this.handleCancel(type)}
          width={this.getPageWidth() - 60}
          style={{ margin: '30px' }}
        >
          <Row>
            <Col span={8}>
              <div style={{ borderRight: '1px solid' }}>
                Hello World. This will be the configuration part
              </div>
            </Col>
            <Col span={16}>
              Hello World. This will be the Preview part.
            </Col>
          </Row>
        </Modal>
        <Modal
          visible={this.state.modalVisibleSection}
          title="Add section title"
          onOk={() => this.handleOkForSection(id)} onCancel={() => this.handleCancel(type)}
        >
          <Input
            placeholder="Section name"
            onChange={(e) => this.sectionTitleUpdate(e)}
          />
        </Modal>
        <div
          style={{ display: 'flex' }}
        >
          <div style={{ padding: '10px', marginRight: '10px', display: 'inline-block', border: '1px solid', marginLeft: marginLeft, height: '100%' }}>
            {this.props.number}
          </div>
          <div
            style={{ ...style, opacity, backgroundColor: bgColor, color: color }}
            onClick={() => this.onSectionClick(type, id)}
          >
            {name}
            <div style={{ float: 'right' }}>
              <Icon
                type="edit"
                style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => this.showModal(type)}
              />
              <Icon
                type="delete"
                style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => this.showConfirm(type, id)}
              />
            </div>
          </div>
        </div>
      </div>,
    ));
  }
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired,
  moveCard: PropTypes.func.isRequired,
};
