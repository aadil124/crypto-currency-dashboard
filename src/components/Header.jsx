import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCrypto } from "../redux/cryptoSlice";
import Select from "react-select";

const Header = () => {
  const dispatch = useDispatch();
  const { selectedCrypto } = useSelector((state) => state.crypto);

  const options = [
    { value: "bitcoin", label: "Bitcoin" },
    { value: "ethereum", label: "Ethereum" },
    { value: "litecoin", label: "Litecoin" },
    { value: "dogecoin", label: "Dogecoin" },
  ];

  const handleCryptoChange = (selectedOption) => {
    dispatch(setSelectedCrypto(selectedOption.value));
  };

  return (
    <header className="p-4 bg-slate-800 text-white flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">Real-Time Cryptocurrency Dashboard</h1>
      <div className="w-64">
        <Select
          options={options}
          defaultValue={options.find((opt) => opt.value === selectedCrypto)}
          onChange={handleCryptoChange}
          className="text-black font-semibold"
        />
      </div>
      <nav className="flex space-x-4">
        <Link className="text-white hover:underline" to="/dashboard">
          Dashboard
        </Link>
        <Link className="text-white hover:underline" to="/overview">
          Overview
        </Link>
        <Link className="text-white hover:underline" to="/history">
          History
        </Link>
      </nav>
    </header>
  );
};

export default Header;
