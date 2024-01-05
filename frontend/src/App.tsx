import { BrowserRouter } from "react-router-dom";
import AnalyzerRoutes from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <AnalyzerRoutes />
    </BrowserRouter>
  );
}

export default App;
