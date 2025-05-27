import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import LandingPage from "./landingPage/landingPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
