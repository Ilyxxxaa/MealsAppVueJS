const API_KEY =
  "e2287f050e5270435269b217b4deab3bc9b1f3ff9f9414f793e6cd51285a1722";

const tickersHandlers = new Map();

const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

const AGGREGATE_INDEX = "5";

socket.addEventListener("message", (e) => {
  console.log(e);
  const {
    TYPE: type,
    FROMSYMBOL: currency,
    PRICE: newPrice,
  } = JSON.parse(e.data);
  if (type !== AGGREGATE_INDEX) {
    return;
  }
  const handlers = tickersHandlers.get(currency) ?? [];
  handlers.forEach((fn) => fn(newPrice));
});

// export const loadTickers = async () => {
//   if (tickersHandlers.size === 0) {
//     return;
//   }
//   const response = await fetch(
//     `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
//       ...tickersHandlers.keys(),
//     ].join(",")}&tsyms=USD&api_key=${API_KEY}`
//   );
//   const data = await response.json();
//   const updatedPrices = Object.fromEntries(
//     Object.entries(data).map(([key, value]) => [key, value.USD])
//   );
//   Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
//     const handlers = tickersHandlers.get(currency) ?? [];
//     handlers.forEach((fn) => fn(newPrice));
//   });
//   console.log(updatedPrices);
//   return updatedPrices;
// };

const sendToWebSocket = (message) => {
  const stringifiedMessage = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
};

function subscribeToTickerOnWs(ticker) {
  sendToWebSocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
}

function unsubscribeFromTickerOnWs(ticker) {
  sendToWebSocket({
    action: "SubRemove",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
}

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWs(ticker);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
  unsubscribeFromTickerOnWs(ticker);
};

// setInterval(loadTickers, 5000);

window.tickers = tickersHandlers;
