import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { Icon, Modal, Row, Col } from 'antd';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  textAlign: 'left',
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
    };
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      modalVisible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  }
  getPageHeight = () => {
    return window.innerHeight;
  }
  getPageWidth = () => {
    return window.innerWidth;
  }
  showConfirm = () => {
    confirm({
      title: 'Want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
}

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div>
        <Modal
          visible={this.state.modalVisible}
          onOk={this.handleOk} onCancel={this.handleCancel}
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
        <div style={{ ...style, opacity }}>
          {text}
          <div style={{ float: 'right' }}>
            <Icon
              type="edit"
              style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px' }}
              onClick={this.showModal}
            />
            <Icon
              type="delete"
              style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px' }}
              onClick={() => this.showConfirm()}
            />
          </div>
        </div>
      </div>,
    ));
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired,
};
