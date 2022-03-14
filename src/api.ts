
const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  // return fetch("https://api.coinpaprika.com/v1/coins").then((respon) => respon.json());
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

export async function fetchCoinInfo(coinId: string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinTickers(coinId: string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}