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
    <div className="p-4 bg-gray-100 min-h-screen">
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            {selectedCrypto.toUpperCase()} History
          </h2>
          <input
            type="text"
            placeholder="Search by date (e.g., 1/20/2025)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-2 border rounded-md mb-4"
          />
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Price (USD)
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((point) => (
                  <tr key={point[0]} className="hover:bg-gray-100">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
