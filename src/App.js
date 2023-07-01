import { Route, Routes } from "react-router-dom";
import "./App.css";
import { RecipeItem } from "./pages/Archive/RecipeItem";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeItem />} />
      </Routes>
    </div>
  );
}

export default App;
