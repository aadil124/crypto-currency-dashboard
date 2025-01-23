import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import History from "./pages/History";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="min-h-screen p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <Footer lastUpdated={Date.now()} />
      </Router>
    </Provider>
  );
};

export default App;
