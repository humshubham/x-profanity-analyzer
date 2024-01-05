import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Results from "./Results";

const AnalyzerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="results" element={<Results />} />
      </Routes>
    </>
  );
};

export default AnalyzerRoutes;
