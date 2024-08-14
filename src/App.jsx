import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Monitor from "./pages/Monitor/Monitor";
import Reports from "./pages/Reports/Reports";
import Monitor2 from "@src/pages/Monitor2";
import Monitor3 from "../src/pages/Monitor3/Monitor3"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/monitor2" element={<Monitor2 />} />
        <Route path="/monitor3" element={<Monitor3 />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;
