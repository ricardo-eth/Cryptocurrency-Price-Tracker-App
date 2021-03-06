import React, { useState, useEffect } from "react";
//import axios from "axios";
import "./App.css";
import Coin from "./Coin";

const gitHubUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getGitHubApiWithFetch();
    //getGiHubApiWithAxios();
  }, []);

  //// get GitHub Api With Fetch
  const getGitHubApiWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();

    // Get data
    const volumeSro = jsonData[1].total_volume;
    const marketCapSro = jsonData[1].market_cap;
    const pricePercentageSro = jsonData[1].price_change_percentage_24h;

    // Add SRO token
    await jsonData.splice(2, 0, {
      id: "sarahro",
      symbol: "sro",
      name: "SarahRO",
      image: "https://sarahro-sro.netlify.app/sarahro_large.png",
      current_price: 0.005,
      market_cap: marketCapSro - 34452473064,
      total_volume: volumeSro - 20452473064,
      price_change_24h: 1000,
      price_change_percentage_24h: pricePercentageSro + 1000,
    });
    setCoins(jsonData);
  };

  //// get GiHub Api With Axios

  // const getGiHubApiWithAxios = async () => {
  //   const response = await axios.get(gitHubUrl);
  //   setCoins(response.data);
  // };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            rank={coin.market_cap_rank}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
