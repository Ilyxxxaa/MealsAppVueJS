const API_KEY =
  "e2287f050e5270435269b217b4deab3bc9b1f3ff9f9414f793e6cd51285a1722";

const tickersHandlers = new Map();

export const loadTickers = async () => {
  if (tickersHandlers.size === 0) {
    return;
  }
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
      ...tickersHandlers.keys(),
    ].join(",")}&tsyms=USD&api_key=${API_KEY}`
  );
  const data = await response.json();
  const updatedPrices = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value.USD])
  );
  Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
    const handlers = tickersHandlers.get(currency) ?? [];
    handlers.forEach((fn) => fn(newPrice));
  });
  console.log(updatedPrices);
  return updatedPrices;
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
};

setInterval(loadTickers, 5000);

window.tickers = tickersHandlers;
