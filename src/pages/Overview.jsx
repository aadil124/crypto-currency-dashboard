import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData } from "../redux/cryptoSlice";

const Overview = () => {
  const dispatch = useDispatch();
  const { selectedCrypto, overviewData, status } = useSelector(
    (state) => state.crypto
  );

  useEffect(() => {
    dispatch(fetchCryptoData(selectedCrypto));
  }, [selectedCrypto, dispatch]);

  return (
    <div className="p-4">
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && overviewData && (
        <>
          <h2 className="text-2xl font-bold">{overviewData.name} Overview</h2>
          <p>
            Market Cap: $
            {overviewData.market_data.market_cap.usd.toLocaleString()}
          </p>
          <p>Total Supply: {overviewData.market_data.total_supply}</p>
          <p>
            Circulating Supply: {overviewData.market_data.circulating_supply}
          </p>
          <p>
            All-Time High: ${overviewData.market_data.ath.usd.toLocaleString()}
          </p>
          <p>Rank: #{overviewData.market_cap_rank}</p>
          <p>Description: {overviewData.description.en.split(".")[0]}</p>
        </>
      )}
    </div>
  );
};

export default Overview;
