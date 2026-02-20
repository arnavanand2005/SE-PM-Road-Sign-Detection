import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import DatasetInfo from "./pages/DatasetInfo";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dataset" element={<DatasetInfo />} />
      </Routes>
    </>
  );
}