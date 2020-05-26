function MarketPrice(ticker) {
  var res = UrlFetchApp.fetch("https://api.tinkoff.ru/trading/stocks/get", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ "ticker": ticker })
  });
  var json = JSON.parse(res.getContentText());
  return [[json.payload.price.value, json.payload.price.currency]];
}

function Portfolio(apiKey, brokerAccountId) {
  var res = UrlFetchApp.fetch("https://api-invest.tinkoff.ru/openapi/portfolio" + (brokerAccountId ? "?brokerAccountId=" + brokerAccountId : "") , {
    method: "get",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + apiKey }
  });
  var json = JSON.parse(res.getContentText());
  var result = [];
  json.payload.positions.forEach(function (position) {
    result.push(
      [
        position.instrumentType,
        position.ticker,
        position.balance,
        position.averagePositionPrice.currency,
        position.averagePositionPrice.value,
        position.averagePositionPrice.value * position.balance,
        position.expectedYield.value
      ]
    );
  });

  return result;
}
