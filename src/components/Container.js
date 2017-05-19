import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Row, Col, Button } from 'antd';
import Card from './Card';

const style = {
  width: 400,
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor() {
    super();
    this.updateCardName = this.updateCardName.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: [],
    };
  }

  updateCardName = (id, name) => {
    let cardInfo = this.state.cards.map((card) => {
      if (card.id === id) {
        card.name = name;
      }
      return card;
    });
    this.setState({
      cards: cardInfo,
    });
  };

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
      type: item.name,
      name: item.name,
    });
    this.setState({
      cards: cardList,
    });
  }

  render() {
    const { cards } = this.state;
    const list = [
      {
        name: "Section",
        icon: "folder-add",
      },
      {
        name: "Peer assignment",
        icon: "copy",
      },
      {
        name: "Learning assignment",
        icon: "book",
      },
      {
        name: "Quiz assignment",
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
                  list.map((item, index) => {
                    return (
                      <li key={item.name + index}>
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
                  cards.map((card, i) => {
                    return (
                      <Card
                        key={card.id}
                        index={i}
                        id={card.id}
                        type={card.type}
                        name={card.name}
                        updateCardName={this.updateCardName}
                        moveCard={this.moveCard}
                      />
                    )
                  })
                }
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
