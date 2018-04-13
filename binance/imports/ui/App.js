import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Coins } from '../api/bot.js';

import Coin from './Bot.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }
  
  renderCoins() {
    let filteredCoins = this.props.coins;
    return filteredCoins.map((coin) => (
      <Coin key={coin._id} coin={coin} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Coins by volume</h1>
        </header>

        <ul>
          {this.renderCoins()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    coins: Coins.find({}, { sort: { volume: -1 } }).fetch(),
  };
})(App);