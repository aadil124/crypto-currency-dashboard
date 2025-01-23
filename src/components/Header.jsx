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
    <header className="p-4 bg-slate-800 text-white shadow-lg">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold flex-1 text-center md:text-left">
          Real-Time Cryptocurrency Dashboard
        </h1>
        <div className="w-full md:w-64">
          <Select
            options={options}
            defaultValue={options.find((opt) => opt.value === selectedCrypto)}
            onChange={handleCryptoChange}
            className="text-black font-semibold"
          />
        </div>
        <nav className="flex-1 flex flex-wrap justify-center md:justify-end gap-4">
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
      </div>
    </header>
  );
};

export default Header;
