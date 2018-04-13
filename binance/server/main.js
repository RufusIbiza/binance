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
    binance.websockets.miniTicker(markets => { //remove arrow function here, work with function()
      //we've got the live information from binance

      //So, generel idea, work with keys to het thru data, pass the objects with function and use it
      console.log('Startingg: ');
      console.log(typeof(markets));
      console.log(markets);
      for (var i = 0, len = keys.length; i < len; i++) {
        // someFn(arr[i]);
        console.log(1);
        console.log(keys);
      }
      // _.each(markets, function() {
      //   coinNames = Object.keys(markets);
      //   _.each(coinNames, function(thisCoin) {
      //     for (thisCoin in markets) {
      //       //console.log(markets[thisCoin]);
      //       coinObj = { "pair": thisCoin, "close": markets[thisCoin].close, "volume": markets[thisCoin].volume };
      //       //console.log(coinObj);
      //       /* db.Coins.insert( coinObj, function(error, _id) {
      //         console.log(coinObj);
      //         return coinObj;
      //         });
      //       }); */
      //       var id = db.Coins.insert(coinObj);
      //     }
      //   });
      // }); 
    });
  });
});