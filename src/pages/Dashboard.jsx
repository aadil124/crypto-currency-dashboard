import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../components/Chart";
import { fetchCryptoData } from "../redux/cryptoSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { selectedCrypto, currentData, historicalData, status } = useSelector(
    (state) => state.crypto
  );

  useEffect(() => {
    dispatch(fetchCryptoData(selectedCrypto));
  }, [selectedCrypto, dispatch]);

  return (
    <div className="p-4">
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <>
          <h2 className="text-2xl font-bold">
            {selectedCrypto.toUpperCase()} Dashboard
          </h2>
          <p>Current Price: ${currentData.usd}</p>
          <p>24h Change: {currentData.usd_24h_change.toFixed(2)}%</p>
          <Chart data={historicalData} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
