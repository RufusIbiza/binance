import { Meteor } from 'meteor/meteor';
import '../imports/api/bot.js';
const binance = require('node-binance-api');
Fiber = Npm.require('fibers');

binance.options({
  APIKEY: 'hn89mgQ4IcDzh73oZ8VTTCqRzVnGfoWhCb3XTl7bqG4dMUAaQJgIqtAeOfDQUJ9p',
  APISECRET: '0J2AQoGypsEL8ZnVZ4V7kfzcLkzhh6eZbGYcsHNsOkCmpXnrrfRiUMgKipDMQ2jK',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
});

Meteor.startup(() => {
  // code to run on server at startup
  db.Coins.remove({});
  binance.prices( Meteor.bindEnvironment(function(error, ticker) {
    var obj = ticker;
    var keys = Object.keys(obj);
    binance.websockets.miniTicker(Meteor.bindEnvironment(function(markets) { 
      coinNames = Object.keys(markets);
      for (var i = 0, len = coinNames.length; i < len; i++) {
        for (thisCoin in markets) {
          coinObj = { "pair": thisCoin, "close": markets[thisCoin].close, "volume": markets[thisCoin].volume };
          var id = db.Coins.insert(coinObj);
          console.log(id);
        }
      }
    }));
  }));
});