import { Meteor } from 'meteor/meteor';
import '../imports/api/bot.js';
const binance = require('node-binance-api');
const RSI = require('technicalindicators').RSI;
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
          coinObj = { "pair": thisCoin, "close": [markets[thisCoin].close], "volume": markets[thisCoin].volume };
          let data = db.Coins.findOne({ "pair": coinObj.pair });
          if (!data){
            var id = db.Coins.insert(coinObj);
            //console.log(coinObj.pair);
            //this coin doesn't exist in the db yet
          } else {
            // this coin is already in the db
            //get the close data already in the database and add the latest update 
              var closeValues = data.close;
              closeValues.push(markets[thisCoin].close);
              //get the binance candlestick data for this coin, so we can calculate the RSI
              binance.candlesticks( Meteor.bindEnvironment(thisCoin, '1m', (error, ticks, symbol) => {
                console.log("candlesticks()", ticks);
                let last_tick = ticks[ticks.length - 1];
                let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
                console.log(symbol+" last close: "+close);
              }, {limit: 5}));
              //if there's 5 or more close values, we can generate RSI from the close values
              //update the information in the db
              var id = db.Coins.update({ "pair": coinObj.pair}, { "pair": coinObj.pair, "volume": markets[thisCoin].volume, "close": closeValues });
          }
          //now get the latest candlestick data for this coin

        }
      }
    }));
  }));
});