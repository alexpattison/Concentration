import React from 'react';
import {render} from 'react-dom';

function Card(props) {
  var path = "../assets/cards/SVG-cards-1.3/"
  var faceup = props.value + '_of_' + props.suit + '.svg'
  return (
    <button className="card" onClick={() => props.onClick()}>
      <img src={path + (props.faceup ? faceup : 'back.svg')}></img>
    </button>
  )
}

class Tableau extends React.Component {
  // This component should really just store whether or not the cards are face up
  // The problem here is that when I am dealing the cards each card will have to be given a suit by the deck constructor/shuffler
  constructor(props) {
    super(props);
    this.state = {
      deck: createDeck()
    }
  }

  handleClick(i) {
    console.log("I'm card: ", i)
    var deck = this.state.deck.slice();
    console.log("deck[i]: ", deck[i])
    deck[i].faceup = !deck[i].faceup;
    console.log("faceup", deck[i].faceup);
    this.setState({deck: deck});
  }

  renderCard(card, key) {
    return <Card value={card.value} suit={card.suit} faceup={card.faceup} key={key} onClick={() => this.handleClick(key)}/>
  }

  render() {
    return (
      <div>
        {this.state.deck.map((card, key) => (
          this.renderCard(card, key)
        ))}
      </div>
    )
  }
}

render (
  <Tableau />, document.getElementById('game')
)

function createDeck() {
  let deck = [];

  const suits = [
    'clubs',
    'diamonds',
    'spades',
    'hearts'
  ];

  const values = [
    'ace',
    'king',
    'queen',
    'jack',
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2
  ];

  for (let i = 0; i < values.length; i ++) {
    for (let j = 0; j < suits.length; j ++) {
      deck.push({value: values[i], suit: suits[j]});
    }
  }

  return deck;
}
