import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData } from "../redux/cryptoSlice";

const History = () => {
  const dispatch = useDispatch();
  const { selectedCrypto, historicalData, status } = useSelector(
    (state) => state.crypto
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCryptoData(selectedCrypto));
  }, [selectedCrypto, dispatch]);

  const filteredData = historicalData.filter((point) => {
    const date = new Date(point[0]).toLocaleDateString();
    return date.includes(search);
  });

  return (
    <div className="p-4">
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <>
          <h2 className="text-2xl font-bold">
            {selectedCrypto.toUpperCase()} History
          </h2>
          <input
            type="text"
            placeholder="Search by date (e.g., 1/20/2025)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded my-4"
          />
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((point) => (
                <tr key={point[0]}>
                  <td className="border border-gray-300 p-2">
                    {new Date(point[0]).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ${point[1].toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default History;
