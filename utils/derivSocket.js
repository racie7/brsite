export function getDerivBalance(token) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=76589');

    ws.onopen = () => {
      ws.send(JSON.stringify({ authorize: token }));
    };

    ws.onmessage = (msg) => {
      const response = JSON.parse(msg.data);

      if (response.msg_type === 'authorize') {
        ws.send(JSON.stringify({ balance: 1 }));
      }

      if (response.msg_type === 'balance') {
        ws.close();
        resolve({
          balance: response.balance.balance,
          currency: response.balance.currency,
          loginid: response.balance.loginid,
        });
      }

      if (response.error) {
        ws.close();
        reject(response.error.message);
      }
    };
  });
}
