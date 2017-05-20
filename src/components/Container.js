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
    this.deleteCardFromList = this.deleteCardFromList.bind(this);
    this.state = {
      cards: [],
      activeSectionId: '',
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

  makeActiveSection = (id) => {
    this.setState({
      activeSectionId: id,
    });
  }

  addSection(item) {
    const cardList = this.state.cards;
    const id = this.getUniqueIdForCard();
    let findSection = false;
    let indexForNewCard;
    if (item.name === 'Section') {
      this.setState({
        activeSectionId: id,
      });
    }
    cardList.forEach((card, index) => {
      if (findSection && card.type === 'Section') {
        indexForNewCard = index;
        findSection = false;
      }
      if (card.id === this.state.activeSectionId) {
        findSection = true;
      }
    });
    if (item.name !== 'Section' && indexForNewCard !== undefined) {
      cardList.splice(indexForNewCard, 0, {
        id: id,
        type: item.name,
        name: item.name,
      });
    } else if (indexForNewCard === undefined) {
      cardList.push({
        id: id,
        type: item.name,
        name: item.name,
      });
    }
    this.setState({
      cards: cardList,
    });
  }

  deleteCardFromList = (type, id) => {
    let { cards } = this.state;
    let cardList = [];
    if (type === 'Section') {
      let startingIndex, endingIndex;
      cards.forEach((card, index) => {
        if (startingIndex !== undefined && card.type === 'Section') {
          endingIndex = index - 1;
        }
        if (card.id === id) {
          startingIndex = index;
        }
      });
      if (endingIndex === undefined) {
        endingIndex = cards.length;
      }
      cards.forEach((card, index) => {
        if (!(index >= startingIndex && index <= endingIndex)) {
          cardList.push(card);
        }
      });
    } else {
      let cardsIndex;
      cards.forEach((card, index) => {
        if (card.id === id) {
          cardsIndex = index;
        }
      });
      cards.forEach((card, index) => {
        if (cardsIndex !== index) {
          cardList.push(card);
        }
      });
    }
    this.setState({
      cards: cardList,
    });
  };

  render() {
    const { cards, activeSectionId } = this.state;
    let sectionNumber = 0;
    let assignmentNumber = 1;
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
                    let index;
                    if (card.type === 'Section') {
                      index = sectionNumber + 1;
                      sectionNumber++;
                      assignmentNumber = 1;
                    } else {
                      index = `${sectionNumber}.${assignmentNumber}`;
                      assignmentNumber++;
                    }
                    return (
                      <Card
                        key={card.id}
                        index={i}
                        number={index}
                        id={card.id}
                        type={card.type}
                        name={card.name}
                        updateCardName={this.updateCardName}
                        moveCard={this.moveCard}
                        makeActiveSection={this.makeActiveSection}
                        activeSectionId={activeSectionId}
                        deleteCardFromList={this.deleteCardFromList}
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
