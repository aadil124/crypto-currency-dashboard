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
    <div className="p-4 bg-gray-100 min-h-screen">
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && overviewData && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            {overviewData.name} Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <p className="text-sm font-semibold text-gray-500">Market Cap</p>
              <p className="text-lg font-bold">
                ${overviewData.market_data.market_cap.usd.toLocaleString()}
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-sm font-semibold text-gray-500">
                Total Supply
              </p>
              <p className="text-lg font-bold">
                {overviewData.market_data.total_supply || "N/A"}
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-sm font-semibold text-gray-500">
                Circulating Supply
              </p>
              <p className="text-lg font-bold">
                {overviewData.market_data.circulating_supply.toLocaleString()}
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-sm font-semibold text-gray-500">
                All-Time High
              </p>
              <p className="text-lg font-bold">
                ${overviewData.market_data.ath.usd.toLocaleString()}
              </p>
            </div>
            <div className="p-4 border rounded-md sm:col-span-2">
              <p className="text-sm font-semibold text-gray-500">Rank</p>
              <p className="text-lg font-bold">
                #{overviewData.market_cap_rank}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-sm text-gray-700">
              {overviewData.description.en
                ? overviewData.description.en.split(".")[0]
                : "No description available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
