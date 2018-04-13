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
  binance.prices((error, ticker) => {
    var obj = ticker;
    var keys = Object.keys(obj);
    console.log(keys);
    var trigger = false;
  
    /* binance.websockets.trades(keys, (trades) => {
      let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
      console.log(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
    }); */ //This is to get the live trade information
    binance.websockets.miniTicker(markets => {
      //we've got the live information from binance
      _.each(markets, function() {
        coinNames = Object.keys(markets);
        if (!trigger) { 
          console.log(coinNames); 
        } else { 
          trigger = false; 
        }
      });
    });
  });
});