const binance = require('node-binance-api');
binance.options({
  APIKEY: 'hn89mgQ4IcDzh73oZ8VTTCqRzVnGfoWhCb3XTl7bqG4dMUAaQJgIqtAeOfDQUJ9p',
  APISECRET: '0J2AQoGypsEL8ZnVZ4V7kfzcLkzhh6eZbGYcsHNsOkCmpXnrrfRiUMgKipDMQ2jK',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
});

binance.prices((error, ticker) => {
  var obj = ticker;
  var keys = Object.keys(obj);
  console.log(keys);
  //console.log(coinList);

  /* binance.websockets.trades(keys, (trades) => {
    let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
    console.log(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
  }); */
  binance.websockets.miniTicker(markets => {
    console.log(markets);
  });
  /*binance.websockets.depthCache(keys, (symbol, depth) => {
    let bids = binance.sortBids(depth.bids);
    let asks = binance.sortAsks(depth.asks);
    console.log(symbol+" depth cache update");
    console.log("bids", bids);
    console.log("asks", asks);
    console.log("best bid: "+binance.first(bids));
    console.log("best ask: "+binance.first(asks));
  });*/

});