import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Row, Col, Button, Icon } from 'antd';
import Card from './Card';

const style = {
  width: 400,
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor() {
    super();
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: [],
    };
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
  }

  getUniqueIdForCard = () => {
    return new Date().getUTCMilliseconds();
  }

  addSection(item) {
    const cardList = this.state.cards;
    cardList.push({
      id: this.getUniqueIdForCard(),
      text: item.name,
    });
    this.setState({
      cards: cardList,
    });
  }

  render() {
    const { cards } = this.state;
    const list = [
      {
        name: "peer assignment",
        icon: "copy",
      },
      {
        name: "learning assignment",
        icon: "book",
      },
      {
        name: "quiz assignment",
        icon: "save",
      },
    ];
    return (
      <div>
        <div>
          <Row>
            <Col span={8}>
              <ul>
                {
                  list.map((item) => {
                    return (
                      <li>
                        <Button
                          type="dashed"
                          icon={item.icon}
                          style={{ margin: '5px 0', width: '200px', fontSize: '15px', height: '38px', textAlign: 'left' }}
                          onClick={() => this.addSection(item)}
                        >
                          <span style={{ fontWeight: '500' }}>
                            {item.name}
                          </span>
                        </Button>
                      </li>
                    )
                  })
                }
              </ul>
            </Col>
            <Col span={16}>
              <div style={style}>
                {
                  cards.map((card, i) => (
                  <Card
                    key={card.id}
                    index={i}
                    id={card.id}
                    text={card.text}
                    moveCard={this.moveCard}
                  />
                  ))
                }
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
